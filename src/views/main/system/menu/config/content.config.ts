const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新建角色'
  },
  columnList: [
    {
      type: 'selection',
      width: '40px'
    },
    {
      width: '60px',
      type: 'index',
      label: '序号'
    },
    {
      type: 'normal',
      width: '120px',
      label: '角色名称',
      prop: 'name'
    },
    {
      type: 'normal',
      width: '100px',
      label: '角色介绍',
      prop: 'intro'
    },
    {
      type: 'timer',
      label: '创建时间',
      prop: 'createAt'
    },
    {
      type: 'timer',
      label: '更新时间',
      prop: 'updateAt'
    },
    {
      type: 'operation',
      width: '150px',
      label: '操作'
    }
  ]
}

export default contentConfig
