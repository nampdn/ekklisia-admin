import exportFromJSON from 'export-from-json'
import _ from 'lodash'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'

const mapArrayAsKeys = (params) =>
  _.chain(params).keyBy('key').mapValues('value').value()

export const QUERY = gql`
  query DRAFT_PROFILES {
    draftProfiles {
      id
      fullName
      nationalId
      phoneNumber
      birthday
      createdAt
      meta {
        id
        key
        value
      }
    }
  }
`

const FORM_MODELS = {
  clothesSize: [
    { value: 'S', title: 'S|< 50 kg' },
    { value: 'M', title: 'M|50-60 kg' },
    { value: 'L', title: 'L|60-70 kg' },
    { value: 'XL', title: 'XL|< 80 kg' },
    { value: 'XXL', title: 'XXL|> 80 kg' },
    { value: 'Other', title: 'Khác' },
  ],
  // eslint-disable-next-line prefer-spread
  groups: Array.apply(null, { length: 15 })
    .map(Number.call, Number)
    .map((i) => ({ value: i + 1, title: i + 1 })),
  joinAge: [
    { value: 'gt3', title: 'Trên 3 tháng' },
    { value: 'lt3', title: 'Dưới 3 tháng' },
  ],
  paymentLevel: {
    lt3: [{ value: '1500000', title: 'Bạn mới|1.500.000đ' }],
    gt3: [
      { value: '750000', title: 'Sinh viên, thu nhập dưới 3 triệu|750.000đ' },
      { value: '1100000', title: 'Thu nhập 3-5 triệu|1.100.000đ' },
      { value: '1300000', title: 'Thu nhập trên 5-7 triệu|1.300.000đ' },
      { value: '1500000', title: 'Thu nhập trên 7 triệu|1.500.000đ' },
    ],
  },
  paymentMethod: [
    { value: 'BANK', title: 'Chuyển khoản trực tiếp cho thủ quỹ' },
    { value: 'GROUP_LEADER', title: 'Nộp tiền mặt trực tiếp cho nhóm trưởng' },
    { value: 'MANAGER', title: 'Nộp tiền mặt trực tiếp cho thủ quỹ' },
  ],
  paymentStage: [
    { value: 'FULL', title: 'Đóng đủ một lần' },
    { value: 'PARTIAL', title: 'Đặt cọc|500.000đ' },
  ],
  gender: [
    { value: 'MALE', title: 'Nam' },
    { value: 'FEMALE', title: 'Nữ' },
  ],
}

const metaTitle = (model, metaValue) => {
  for (const meta of FORM_MODELS[model]) {
    if (meta.value === metaValue) {
      return meta.title
    }
  }
  return metaValue
}

const birthdayTag = (birthday) => {
  return dayjs(birthday).format('DD/MM/YYYY')
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ draftProfiles }) => {
  const ex = () => {
    const table = []
    let i = 1
    for (const profile of draftProfiles) {
      const meta = mapArrayAsKeys(profile.meta)
      const paymentStage = meta.paymentStage
      const paymentLevel = parseInt(meta.paymentLevel)
      const offering = parseInt(meta.offering) || 0
      const totalDeposit = paymentLevel + offering
      const balance = parseInt(meta.amount) || 0
      const status =
        balance >= totalDeposit
          ? 'Đã hoàn tất lệ phí'
          : balance > 0 && balance < totalDeposit && paymentStage === 'PARTIAL'
          ? 'Đã đóng cọc'
          : 'Chưa hoàn tất'
      const note = meta.status === 'NO_PAYMENT' ? '' : meta.status
      table.push({
        STT: i++,
        'Họ và tên': profile.fullName,
        'Giới tính': metaTitle('gender', meta.gender),
        CMND: "'" + profile.nationalId,
        'Số điện thoại': profile.phoneNumber.replace('+84', "'0"),
        'Ngày sinh': birthdayTag(profile.birthday),
        'Size áo': meta.clothesSize,
        'Nhóm nhỏ': meta.group,
        'Thời gian nhóm lại': metaTitle('joinAge', meta.joinAge),
        'Mức đóng lệ phí': paymentLevel,
        'Dâng hiến': offering,
        'Tổng cần thu': totalDeposit,
        'Đã nộp': balance,
        'Trạng thái': status,
        'Ngày nộp': birthdayTag(profile.createdAt),
        'Ghi chú': note,
      })
    }
    exportFromJSON({
      data: table,
      fileName: 'tkmt' + dayjs().format('YYYYMMDD-HHmm'),
      exportType: 'xls',
    })
  }
  return (
    <button onClick={ex} className="rw-button rw-button-large">
      Xuất Excel
    </button>
  )
}
