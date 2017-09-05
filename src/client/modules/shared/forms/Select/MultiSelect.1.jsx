import 'antd/es/radio/style/css'
import 'antd/es/select/style/css'

import Radio from 'antd/es/radio'
import React from 'react'
import Select from 'antd/es/select'

const Option = Select.Option
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const getEmptyArr = () => {}

const withOptions = (OptionType, getType) => Component =>
  class withOptionsComponent extends React.PureComponent {
    static defaultProps = {
      valueKey: 'value',
      labelKey: 'label',
      optionsKey: 'options'
    };
    render () {
      const props = this.props

      if (getType) {
        OptionType = getType(props)
      }
      const valueKey = props.valueKey
      const labelKey = props.labelKey
      const optionsKey = props.optionsKey
      const options = props[optionsKey] || getEmptyArr()

      return (
        <div>
          <div ref='container' />
          <Component getPopupContainer={() => this.refs.container} {...props}>
            {options.map(
              ({[valueKey]: value, [labelKey]: label, ...rest}, key) =>
                <OptionType {...rest} key={key} value={String(value)}>
                  {label}
                </OptionType>
            )}
          </Component>
        </div>
      )
    }
  }

export const RadioField = withOptions(
  null,
  ({button}) => (button ? RadioButton : Radio)
)(RadioGroup)
export const SelectField = withOptions(Option)(Select)
