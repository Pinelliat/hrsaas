import request from '@/utils/request'

/**
 * 获取角色列表
 * ***/
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params // page 页码  pagesize 每页条数
  })
}

export function addRole(data) {
  return request({
    url: '/sys/role',
    data,
    method: 'post'
  })
}

/**
 * 修改角色
 * ***/
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}

export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
