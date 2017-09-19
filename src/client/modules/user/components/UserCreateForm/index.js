import React from 'react'
import { Field, reduxForm } from 'redux-form/es/immutable'
import { Button, Row, Alert } from 'antd'
import { Input } from '@clientModulesShared/forms'
import BaseComponent from '@clientModulesShared/BaseComponent'
import LicenseUpload from '../LicenseUpload'
import GenderRadio from '../GenderRadio'
import RoleRadio from '../RoleRadio'
import formItemHOC from '@clientModulesShared/formItemHOC'

const GenderRadioFormItem = formItemHOC(GenderRadio)
const RoleRadioFormItem = formItemHOC(RoleRadio)
const LicenseUploadFormItem = formItemHOC(LicenseUpload)

const validate = values => {
  const errors = {}
  const requiredFields = ['username', 'password', 'fullname']
  requiredFields.forEach(field => {
    if (!values.get(field)) {
      errors[field] = '必填'
    }
  })
  return errors
}

class UserCreateForm extends BaseComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      errorMessage
    } = this.props
    return (
      <form onSubmit={handleSubmit}>
        {errorMessage ? (
          <Row>
            <Alert message={errorMessage} type='error' banner />
          </Row>
        ) : null}
        <Field name='username' component={Input} placeholder='工号' />
        <Field name='password' component={Input} type='password' placeholder='密码' />
        <Field name='fullname' component={Input} placeholder='真实姓名' />
        <Field name='gender' component={GenderRadioFormItem} />
        <Field name='role' component={RoleRadioFormItem} />
        <Field name='license' component={LicenseUploadFormItem} placeholder='身份证正面' />
        <Row type='flex' justify='space-between'>
          <Button
            size='large'
            type='primary'
            htmlType='submit'
            disabled={pristine || submitting}
          >
            注册
          </Button>
          <Button
            size='large'
            type='default'
            disabled={pristine || submitting}
            onClick={reset}
          >
            清空
          </Button>
        </Row>
      </form>
    )
  }
}

export default reduxForm({
  form: 'userCreateForm',
  validate
})(UserCreateForm)
