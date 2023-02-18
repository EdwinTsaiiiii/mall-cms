export const rules = {
  name: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,10}$/,
      message: '用户名必须是3-10个字符',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6,12}$/,
      message: '密码必须是6-12个字符',
      trigger: 'blur'
    }
  ],
  phone: [
    {
      required: true,
      message: '手机号不能为空',
      trigger: 'blur'
    },
    {
      pattern: /^1[345789]\d{9}$/g,
      message: '非法手机号',
      trigger: 'blur'
    }
  ],
  auth_code: [
    {
      required: true,
      message: '验证码不能为空',
      trigger: 'blur'
    }
  ]
}
