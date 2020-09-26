import exportFromJSON from 'export-from-json'
import _ from 'lodash'
import { useState, useRef } from 'react'
import { useMutation } from '@redwoodjs/web'
import { Link, navigate, routes } from '@redwoodjs/router'
import ProfileListItem from 'src/components/ProfileListItem'
import ProfileSelectCell from 'src/components/ProfileSelectCell'

import dayjs from 'dayjs'
import 'dayjs/locale/vi'

const mapArrayAsKeys = (params) =>
  _.chain(params).keyBy('key').mapValues('value').value()

const birthdayTag = (birthday) => {
  return dayjs(birthday).format('DD/MM/YYYY')
}

const ATTACH_PROFILES_TO_CONTAINER_MUTATION = gql`
  mutation ATTACH_PROFILES_TO_CONTAINER(
    $containerId: String!
    $profileIds: [String!]!
  ) {
    attachProfilesToContainer(
      containerId: $containerId
      profileIds: $profileIds
    )
  }
`

const DETACH_PROFILE_FROM_CONTAINER_MUTATION = gql`
  mutation DETACH_PROFILE_TO_CONTAINER(
    $containerId: String!
    $profileId: String!
  ) {
    detachProfileFromContainer(containerId: $containerId, profileId: $profileId)
  }
`
const ContainerCard = ({ data }) => {
  const [enableInput, setEnableInput] = useState(false)
  const selectedProfiles = useRef([])
  const { id, name, type, note, capacity, profiles } = data
  const [attachProfilesToContainer, { attachLoading }] = useMutation(
    ATTACH_PROFILES_TO_CONTAINER_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.containers())
      },
    }
  )
  const [detachProfileFromContainer, { detachLoading }] = useMutation(
    DETACH_PROFILE_FROM_CONTAINER_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.containers())
      },
    }
  )

  const toggleInput = () => {
    setEnableInput(!enableInput)
  }

  const attachProfile = () => {
    console.log(`Attaching profiles...`)
    attachProfilesToContainer({
      variables: {
        containerId: id,
        profileIds: selectedProfiles.current,
      },
    })
  }

  const detachProfile = (profileId) => {
    detachProfileFromContainer({
      variables: {
        containerId: id,
        profileId,
      },
    })
  }

  const onSelectionChange = (profiles) => {
    selectedProfiles.current = profiles.map((p) => p.id)
    console.log(selectedProfiles.current)
  }

  const exportExcel = () => {
    const table = []
    let i = 1
    for (const { profile } of profiles) {
      const meta = JSON.parse(profile.metaByKeys)
      const note = meta.status === 'NO_PAYMENT' ? '' : meta.status
      const nameSplit = profile.fullName.split(' ')
      table.push({
        STT: i++,
        Họ: nameSplit.slice(0, nameSplit.length - 1).join(' '),
        Tên: nameSplit[nameSplit.length - 1],
        'Nhóm nhỏ': meta.group,
        'Ngày sinh': birthdayTag(profile.birthday),
        'Số điện thoại': profile.phoneNumber.replace('+84', "'0"),
        'Ghi chú': note,
      })
    }
    exportFromJSON({
      data: table,
      fileName: `${type.name} - ${name}`,
      exportType: 'xls',
    })
  }

  if (attachLoading || detachLoading) return 'Loading...'

  return (
    <div className="flex flex-col max-w-sm rounded shadow-lg">
      <div className="px-6 py-4 bg-green-500 text-white">
        <div className="flex flex-row justify-between">
          <div className="font-bold text-xl mb-2">{name}</div>
          <span>
            {profiles.length}/{capacity}
          </span>
        </div>
        <p className="text-gray-400 text-base">{note}</p>
      </div>
      <ul>
        {profiles.length > 0 ? (
          profiles.map(({ profile }, index) => (
            <ProfileListItem
              key={profile.id}
              profile={profile}
              onRemove={detachProfile}
              index={index}
            />
          ))
        ) : (
          <li className="p-4">
            Không gian trống, bấm nút Gán để xếp người vào đây
          </li>
        )}
      </ul>
      {enableInput ? (
        <div className="p-4">
          <ProfileSelectCell
            type="draftProfile"
            valueProp="id"
            labelProp="fullName"
            excludeIds={profiles.map((p) => p.profile.id)}
            onSelectionChange={onSelectionChange}
          />
        </div>
      ) : null}
      <span className="flex-1" />
      <div className="flex flex-row justify-between px-6 pt-4 pb-2 bg-orange-200">
        <Link
          to={routes.container({ id })}
          className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          Xem
        </Link>
        <Link
          to={routes.editContainer({ id })}
          className="inline-block bg-yellow-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          Sửa
        </Link>
        <button className="rw-button" onClick={exportExcel}>
          Xuất
        </button>
        <button className="rw-button" onClick={toggleInput}>
          {enableInput ? 'Tắt Gán' : 'Gán'}
        </button>
        {enableInput ? (
          <button className="rw-button" onClick={attachProfile}>
            Lưu
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default ContainerCard
