import React, {Component} from 'react';
import {DropdownButton, MenuItem, OverlayTrigger} from "react-bootstrap";

/**
 * Данный элемент представляет собой кнопку с выпадающим списком элементов, кторые задаются
 * с помощью массива options. В списке будет отображаться значение, найденное по ключу,
 * указанному в labelKey. При нажатии возвращается индекс соответствующего элемента в массиве
 * options.
 *
 * id - ID компонента
 * selLabel - Лейбл, который будет обображаться на самой кнопке
 * options - массив значений
 * labelKey - Ключ, значение которого будет отображаться в выпадющем списке
 * selectedIndex - индекс текущего выбранного элемента в списке
 * tooltip - Бутстраповский <Tooltip/> для отображения подсказки
 */
class DropdownList extends Component {
  render() {
    const {
      id,
      selLabel = 'Select one...',
      bsStyle = 'primary',
      options = [],
      labelKey = 'name',
      selectedIndex,
      tooltip,
      ...props,
    } = this.props;

    const ddBodyTooltip = (
      <OverlayTrigger
        placement="top"
        overlay={tooltip}
      >
        <DropdownButton
          id={id}
          bsStyle={bsStyle}
          title={selLabel}
          {...props}
        >
          {options && options.map((option, index) => {
            return (
              <MenuItem active={selectedIndex === index} key={option[labelKey] + 'MenuItem'} eventKey={index}>
                {option[labelKey]}
              </MenuItem>
            )
          })}
        </DropdownButton>
      </OverlayTrigger>
    );

    const ddBody = (
      <DropdownButton
        id={id}
        bsStyle={bsStyle}
        title={selLabel}
        {...props}
      >
        {options && options.map((option, index) => {
          return (
            <MenuItem active={selectedIndex === index} key={option[labelKey] + 'MenuItem'} eventKey={index}>
              {option[labelKey]}
            </MenuItem>
          )
        })}
      </DropdownButton>
    );
    return (tooltip ? ddBodyTooltip : ddBody)
  }
}

export default DropdownList;
