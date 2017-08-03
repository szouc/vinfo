// @flow

import React from 'react'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'

const RegisterPage = () =>
  <div>
    <ul>
      {[
        { name: 'username', hintText: '用户名', type: 'text', floatFixed: false, floatText: '请输入用户名' },
        { name: 'password', hintText: '密码', type: 'password', floatFixed: false, floatText: '请输入密码' },
        { name: 'againPassword', hintText: '密码', type: 'password', floatFixed: false, floatText: '请再次输入密码' }
      ].map((value) => (
        <li key={value.name}>
          <Input
            placeholder={value.hintText}
            type={value.type}
          />
        </li>
      ))}
      <li>
        <Button type='primary'>注册</Button>
        <Button>取消</Button>
      </li>
    </ul>
  </div>

export default RegisterPage
