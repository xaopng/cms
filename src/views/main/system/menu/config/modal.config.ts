const modalConfig = {
  pageName: 'role',
  header: {
    newTitle: '新建角色',
    edit: '编辑角色'
  },
  formItems: [
    {
      type: 'input',
      label: '角色名称',
      placeholder: '请输入角色名称',
      prop: 'name'
    },
    {
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍',
      prop: 'intro'
    }
  ]
}
export default modalConfig
