import React from 'react'
import {
  MenuItem,
  DropdownButton,
  Panel,
  Grid,
  Label,
  Button,
  Form,
  ListGroup,
  ButtonGroup,
  Glyphicon,
  Modal
} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import DatePicker from "react-datepicker"
import Notifications from 'react-notification-system-redux'
import {filterDirectoryData} from '../../api'
import {forceLogin, getUserName} from '../../globalFunc';
import overlayFactory from 'react-bootstrap-table2-overlay';


//import paginationFactory from 'react-bootstrap-table2-paginator';


class DataDirectoryPage extends React.Component {

  state = {
    chainIndex: null,
    inputTypeIndex: 0,
    dateTo: "",
    dateFrom: ""
  };
  // overlay={ overlayFactory({ spinner: true, background: 'rgba(192,192,192,0.3)' }) }
  //columns - описание таблицы (колонки, содержание, форматтеры)
  columns = [
    {
      dataField: 'id_order',
      text: 'ID заявки:',
      formatter: this.renderOrderDetails
    }, {
      dataField: 'chain_name',
      text: 'Имя цепочки:'
    }, {
      dataField: 'marker',
      text: 'Маркер данных:',
    }, {
      dataField: 'real_start_time',
      text: 'Время запуска:',
      sort: true
    }, {
      dataField: 'displayed_status',
      text: 'Текущий статус:',
      formatter: this.renderBuildStatusRef
    },
    {
      dataField: 'id_order',
      text: 'Перезапуск:',
      formatter: this.renderRerunButton
    },
    {
      dataField: 'id_order',
      text: 'Взятие данных:',
      formatter: this.renderGetDataButton
    }
  ]
  //Ещё описание таблицы: дефолтные сортировки и т.п.
  defSort = [
    {
      dataField: 'real_start_time',
      order: 'desc'
    }]


//Описание форматтеров для таблицы (функции, возвращающие кнопки, элементы и прочая)
  renderOrderDetails(cell, row, rowIndex) {
    return (
      <span>
        <a href={row.id_order} title="Подробности по запущенной заявке">{row.id_order}</a>
      </span>
    )
  }

  renderBuildStatusRef(cell, row, rowIndex) {
    return (
      <span>
        <a href={row.build_link} title="Ссылка на последний билд">{row.displayed_status}</a>
      </span>
    )
  }

  renderGetDataButton(cell, row, rowIndex) {
    return (
      <span>
        <Button
          //onClick={this.submitChanges}
          bsStyle="success"
          bsSize="medium"
          title="Получение данных по заявке"
          // disabled={
          //   !(chainIndex !== null && formBuilderChains[chainIndex].modified)
          // }
        >Использовать
      </Button>
      </span>
    )
  }

  renderRerunButton(cell, row, rowIndex) {
    return (
      <span>
        <Button
          //onClick={this.submitChanges}
          bsStyle="success"
          bsSize="medium"
          title="Перезапуск с последнего теста в цепочке"
          // disabled={
          //   !(chainIndex !== null && formBuilderChains[chainIndex].modified)
          // }
        >Перезапустить
      </Button>
      </span>
    )
  }

//Блок по таблице закончен. TODO - вынести в отдельную зависимость

  setFilter = (data) => {
    const filterData = {
      ...this.state,
      ...data,
    };

    this.setState(filterData, () => {
      this.fetchData()
    });
  };

  componentDidMount() {
    this.props.fetchBuilderChains();
  }

  fetchData() {
    const {formBuilderChains} = this.props;
    const {chainIndex, dateFrom, dateTo} = this.state;

    if (chainIndex !== null && formBuilderChains[chainIndex]) {
      const chainName = formBuilderChains[chainIndex].name;
      this.props.fetchOrdersByName(chainName, dateFrom.format('YYYY.MM.DD'), dateTo.format('YYYY.MM.DD'));
    }
  }

  updateFormBuilderChains(field) {
    const fieldToAdd = {
      field,
      idx: this.state.chainIndex,
    };
    this.props.addField(fieldToAdd);
  }

  changeDateFrom = (dateFrom) => {
    this.setState({dateFrom}, () => {
      this.fetchData()
    })
  }

  changeDateTo = (dateTo) => {
    this.setState({dateTo}, () => {
      this.fetchData()
    })
  }

  renderFormBody = () => {
    const {formBuilderChains} = this.props;
    return (<div></div>);
  };

  render() {
    const {formBuilderChains, notifications} = this.props;
    const {chainIndex, dateFrom, dateTo} = this.state;
    const chainDropDown = [
      <span>
        <div>
      <DropdownButton
        id='chainSelector'
        onSelect={(chainIndex) => this.setFilter({chainIndex})}
        title={chainIndex !== null ? formBuilderChains[chainIndex].name : 'Select one...'}
        bsStyle="btn btn-primary"
      >
        {formBuilderChains.map((chain, index) => {
          return (
            <MenuItem active={index === chainIndex} key={index} eventKey={index}>
              {chain.name}
              &nbsp;
              {formBuilderChains[index].modified && <Label bsStyle="warning">Modified</Label>}
            </MenuItem>
          )
        })}
      </DropdownButton>
        </div>
        Дата запуска от:
        <DatePicker onChange={this.changeDateFrom}
                    selected={dateFrom}
                    locale="ru-RU"
                    dateFormat="DD.MM.YYYY"
                    todayButton='Сегодня'
          //   showTimeSelect
          //placeholderText='Время запуска'
          // timeFormat="HH:mm"
          //  timeIntervals={10}
        />
        Дата запуска до:
        <DatePicker onChange={this.changeDateTo}
                    selected={dateTo}/>
      </span>
    ];

    return (
      <div>
        <Panel header={chainDropDown} footer={null}>
          <Grid fluid={true}>
            {chainIndex !== null && formBuilderChains[chainIndex] && this.renderFormBody()}
          </Grid>
        </Panel>
        <Notifications notifications={notifications}/>
        <BootstrapTable keyField='id'
                        data={this.props.directoryData}
                        columns={this.columns}
                        defaultSorted={this.defSort}
                        overlay={overlayFactory()}/>
      </div>
    )
  }
}

export default DataDirectoryPage
