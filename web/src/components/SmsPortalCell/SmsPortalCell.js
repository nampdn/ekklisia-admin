import { useState } from 'react'
import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import khongdau from 'khong-dau'
import _ from 'lodash'

import SmsSentList from 'src/components/SmsSentList'
import Select from 'react-select'

const mapArrayAsKeys = (params) =>
  _.chain(params).keyBy('key').mapValues('value').value()

const currency = (amount) => {
  if (amount > 0) {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
    return formatter.format(amount)
  } else if (amount === 0) {
    return 0
  }
  return null
}

export const QUERY = gql`
  query META_BY_KEY($id: String!) {
    sms: metaByKey(key: "sms", profileId: $id) {
      id
      key
      value
      DraftProfile {
        id
        fullName
        phoneNumber
        meta {
          key
          value
        }
      }
    }
  }
`

const SEND_SMS_MUTATION = gql`
  mutation SendSMS($profileId: String!, $message: String!) {
    smsSend(profileId: $profileId, message: $message) {
      SMSID
    }
  }
`

const bankProvider = 'Vietcombank'
const bankID = `0531002575122`
const bankName = `TRUONG THANH NHU NGOC`
const contact = '0902457367'
const bankInfo = `${bankID}/${bankProvider}/${bankName}`

const SMS_TEMPLATES = {
  byEvents: [
    `Bạn đã đăng ký {camp}, {fullName}. Vui lòng {action} {amount} qua STK: {bankStatement},nội dung CK: {transactionCode} trong vòng {remainDay} ngày kể từ ngày đăng ký và hoàn tất lệ phí trước ngày {deadlineDay}. Sau {remainDay} ngày hệ thống sẽ tự hủy đơn đăng ký nếu bạn chưa {action}. Chi tiết liên hệ {contact}.`,
    `Bạn đã đăng ký {camp}, {fullName}. Vui lòng {action} {amount} cho {who} trong vòng {remainDay} ngày kể từ ngày đăng ký và hoàn tất lệ phí trước ngày {deadlineDay}. Sau {remainDay} ngày hệ thống sẽ tự hủy đơn đăng ký nếu bạn chưa {action}. Chi tiết liên hệ {contact}.`,
  ],
  byManual: [
    'BTC chuong trinh {camp} da nhan duoc le phi {balance} tu ban. Chuc ban co ki trai y nghia va phuoc hanh, hay lien he thu quy Nhu Ngoc de nhan bien lai.',
    'BTC chuong trinh {camp} da nhan duoc le phi {balance}, ban can nop them {negativeBalance} de hoan tat le phi.',
    'Hien tai BTC trai {camp} van chua nhan duoc khoan thanh toan le phi tu ban. Vui long CK so tien {paymentLevel} qua STK: {bankInfo} - Noi dung CK: {transactionCode} hoac nop truc tiep cho thu quy truoc 22/09. Chi tiet lien he {contact}'
  ],
}

export const template = (s, placeholders) => (payload, ...rest) => {
  let result = s
  for (const place in placeholders) {
    if (place in placeholders) {
      const replacer = placeholders[place]
      result = result.replace(
        new RegExp(`{${place}}`, 'g'),
        typeof replacer === 'function' ? replacer(payload, ...rest) : replacer
      )
    }
  }
  return result
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ sms }) => {
  const profile = sms.DraftProfile
  const [selectedSMS, setSelectedSMS] = useState(null)
  const [sendSMSMutation, { loading }] = useMutation(SEND_SMS_MUTATION, {
    onCompleted: () => {
      alert(`Gửi tin nhắn đến ${profile.fullName} thành công!`)
      navigate(routes.draftProfile({ id: profile.id }))
    },
  })
  const meta = mapArrayAsKeys(profile.meta)
  const transactionCode = meta.transactionCode
  const paymentLevel = parseInt(meta.paymentLevel)
  const offering = parseInt(meta.offering) || 0
  const totalDeposit = paymentLevel + offering
  const balance = parseInt(meta.amount) || 0
  const negativeBalance = totalDeposit - balance
  const smsList =
    sms.value == 'false'
      ? [{ id: null, message: khongdau(meta.message) }]
      : JSON.parse(meta.sms)

  const variables = {
    camp: 'TKMT',
    fullName: profile.fullName,
    name: khongdau(profile.fullName.split(' ').slice(-2).join(' ')),
    amount: currency(meta.amount),
    totalDeposit,
    balance: currency(balance),
    negativeBalance: currency(negativeBalance || 0),
    bankInfo,
    transactionCode,
    contact,
    paymentLevel,
  }

  const SMS_OPTIONS = SMS_TEMPLATES.byManual.map((temp) => {
    const message = template(temp, variables)({})
    return {
      value: khongdau(message).replace('₫', ''),
      label: message,
    }
  })

  const sendSMS = () => {
    const smsParams = {
      variables: {
        profileId: profile.id,
        message: selectedSMS.value,
      },
    }
    sendSMSMutation(smsParams)
  }

  const selectSMS = (value) => {
    setSelectedSMS(value)
  }

  if (loading) return 'Đang gửi tin nhắn...'

  return (
    <>
      <SmsSentList draftProfile={sms.DraftProfile} smsList={smsList} />
      <div className="mt-8">
        <h3>Mẫu tin nhắn</h3>
        <Select
          onChange={selectSMS}
          options={SMS_OPTIONS}
          value={selectedSMS}
        />
        <button className="rw-button rw-button-red mt-8" onClick={sendSMS}>
          Gửi tin nhắn
        </button>
      </div>
    </>
  )
}
