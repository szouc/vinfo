import React from 'react'
import { Field, reduxForm } from 'redux-form/es/immutable'
import { Button, Row, Col } from 'antd'
import { Input, DatePicker } from '@clientModulesShared/forms'
// import BaseComponent from '@clientModulesShared/BaseComponent'
import ImageUpload from '../ImageUpload'
import GenderRadio from '../GenderRadio'
import RoleRadio from '../RoleRadio'
import formItemHOC from '@clientModulesShared/formItemHOC'
import {
  USER_LICENSE_UPLOAD_API,
  USER_ID_FRONT_UPLOAD_API,
  USER_ID_BACK_UPLOAD_API
} from '../../api/apiRoutes'

const GenderRadioFormItem = formItemHOC(GenderRadio)
const RoleRadioFormItem = formItemHOC(RoleRadio)
const ImageUploadFormItem = formItemHOC(ImageUpload)

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

// class UserCreateForm extends BaseComponent {
class UserCreateForm extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting
    } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Field name='username' component={Input} placeholder='工号' />
        <Field
          name='password'
          component={Input}
          type='password'
          placeholder='密码'
        />
        <Field name='fullname' component={Input} placeholder='真实姓名' />
        <Field name='gender' component={GenderRadioFormItem} />
        <Field name='role' component={RoleRadioFormItem} />
        <Row>
          <Col span={8}>
            <Field
              name='id_front'
              component={ImageUploadFormItem}
              placeholder='身份证正面'
              uploadUrl={USER_ID_FRONT_UPLOAD_API}
              numberOfImage={1}
            />
          </Col>
          <Col span={8}>
            <Field
              name='id_back'
              component={ImageUploadFormItem}
              placeholder='身份证反面'
              uploadUrl={USER_ID_BACK_UPLOAD_API}
              numberOfImage={1}
            />
          </Col>
          <Col span={8}>
            <Field
              name='license'
              component={ImageUploadFormItem}
              placeholder='驾驶证'
              uploadUrl={USER_LICENSE_UPLOAD_API}
              numberOfImage={1}
            />
          </Col>
        </Row>
        <Field name='cert' component={Input} placeholder='运输证号' />
        <Field name='cert_expired' component={DatePicker} placeholder='运输证到期日期' />
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
