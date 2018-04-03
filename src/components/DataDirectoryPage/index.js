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
import {filterDirectoryData,updateOrderRerun} from '../../api'
import {forceLogin, getUserName} from '../../globalFunc';
import Header from "../Header";
import overlayFactory from 'react-bootstrap-table2-overlay';
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from "moment";
import filterFactory, { textFilter,selectFilter } from 'react-bootstrap-table2-filter';

import {BACKEND_URL} from "../../constants/endpoints";

class DataDirectoryPage extends React.Component {

  constructor(props,context){
    super(props,context);
    this.renderGetDataButton = this.renderGetDataButton.bind(this);
  }

  state = {
    chainIndex: null,
    inputTypeIndex: 0,
    dateTo: moment(),
    dateFrom: moment()
  };
  // overlay={ overlayFactory({ spinner: true, background: 'rgba(192,192,192,0.3)' }) }
  //columns - описание таблицы (колонки, содержание, форматтеры)
  columns = [
    {
      dataField: 'id_order',
      text: 'ID заявки:',
      formatter: this.renderOrderDetails,
      sort: true,
      filter: textFilter()
    }, {
      dataField: 'chain_name',
      text: 'Имя цепочки:',
      sort: true,
      filter: textFilter()
    }, {
      dataField: 'marker',
      text: 'Маркер данных:',
      sort: true,
      filter: textFilter()

    }, {
      dataField: 'real_start_time',
      text: 'Время запуска:',
      sort: true,
      filter: textFilter()

    }, {
      dataField: 'displayed_status',
      text: 'Текущий статус:',
      sort: true,
      formatter: this.renderBuildStatusRef,
      filter: textFilter()
    },
    // {
    //   headerStyle: { position: 'top' },
    //   dataField: 'id_order',
    //   text: 'Перезапуск:',
    //   formatter: this.renderRerunButton,
    //   align: 'center'
    // },
    // {
    //   dataField: 'id_order',
    //   text: 'Взятие данных:',
    //   formatter: this.renderGetDataButton,
    //   align: 'center'
    // }
    //TODO вернуть эти кнопки
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
      //TODO HREF поменять на API
      <span>
        <a href={`${BACKEND_URL}/objects/${row.id_order}/csv`}
           title="Скачать данные по заявке">{row.id_order}</a>
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
         // onClick={()=>Nope()}
          bsStyle="success"
          bsSize="medium"
          title="Получение данных по заявке"
          disabled={row.f_used!="0"}
        >Использовать
      </Button>
      </span>
    )
  }

  renderRerunButton(cell, row, rowIndex) {
    return (
      <span>
        <Button
          onClick={()=>console.log("To update")}
          bsStyle="success"
          bsSize="medium"
          title="Перезапуск с последнего теста в цепочке"
          // disabled={
          //    !(chainIndex !== null && formBuilderChains[chainIndex].modified)
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

  componentWillMount(){
    forceLogin();
  }
  componentDidMount() {
    this.props.fetchBuilderChains();
  }

  get(orderID) {}

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
    return (<div>
      <BootstrapTable keyField='id'
                                 data={this.props.directoryData}
                                 columns={this.columns}
                                 defaultSorted={this.defSort}
                                 pagination={paginationFactory()}
                                 noDataIndication={ "Нет данных по запросу" }
                                 filter={ filterFactory() }
                                 striped
                                 overlay={overlayFactory()}/>
      {/*<Button*/}
      {/*onClick={() => this.props.updateOrderRerun("201802211300060499")}*/}
      {/*bsStyle="success"*/}
      {/*bsSize="medium"*/}
      {/*title="Перезапуск с последнего теста в цепочке"*/}
    {/*>Перезапустить*/}
    {/*</Button>*/}
    </div>);
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
        title={chainIndex !== null ? formBuilderChains[chainIndex].name : 'Выберите цепочку...'}
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
        />
        Дата запуска до:
        <DatePicker onChange={this.changeDateTo}
                    selected={dateTo}
                    locale="ru-RU"
                    dateFormat="DD.MM.YYYY"
                    todayButton='Сегодня'/>
      </span>
    ];

    return (
        <div>
          <Header owner={getUserName()}/>,
          <Panel header={chainDropDown} footer={null}>
          <Grid fluid={true}>
            {chainIndex !== null && formBuilderChains[chainIndex] && this.renderFormBody()}
          </Grid>
        </Panel>
        <Notifications notifications={notifications}/>

      </div>
    )
  }
}

export default DataDirectoryPage
