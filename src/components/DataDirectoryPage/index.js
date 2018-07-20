import React from 'react'
import {
  Button,
  Alert
} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import DatePicker from "react-datepicker"
import Notifications from 'react-notification-system-redux'
import {forceLogin} from '../../globalFunc';
import Header from "../Header";
import overlayFactory from 'react-bootstrap-table2-overlay';
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from "moment";
import filterFactory, {textFilter, selectFilter} from 'react-bootstrap-table2-filter';
import Select from 'react-select';
import './style.css';

import {BACKEND_URL} from "../../constants/endpoints";
import "moment/locale/ru"

class DataDirectoryPage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.renderGetDataButton = this.renderGetDataButton.bind(this);
    this.props.fetchBuilderChains();
    forceLogin();
  }

  state = {
    chainIndex: null,
    inputTypeIndex: 0,
    dateTo: moment({hour: 23, minute: 59, seconds: 59}),
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
      filter: textFilter({
        placeholder: 'Поиск'
      })
    }, {
      dataField: 'chain_name',
      text: 'Имя цепочки:',
      sort: true,
      filter: textFilter({
        placeholder: 'Поиск'
      })
    }, {
      dataField: 'marker',
      text: 'Маркер данных:',
      sort: true,
      filter: textFilter({
        placeholder: 'Поиск'
      })

    }, {
      dataField: 'real_start_time',
      text: 'Время запуска:',
      sort: true,
      filter: textFilter({
        placeholder: 'Поиск'
      })

    }, {
      dataField: 'displayed_status',
      text: 'Текущий статус:',
      sort: true,
      formatter: this.renderBuildStatusRef,
      filter: textFilter({
        placeholder: 'Поиск'
      })
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
  ];
  //Ещё описание таблицы: дефолтные сортировки и т.п.
  defSort = [
    {
      dataField: 'real_start_time',
      order: 'desc'
    }];


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
          disabled={row.f_used != "0"}
        >Использовать
      </Button>
      </span>
    )
  }

  renderRerunButton(cell, row, rowIndex) {
    return (
      <span>
        <Button
          onClick={() => console.log("To update")}
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
    window.location.hash = '#/datadirectory/'+this.props.formBuilderChains[data.chainIndex].name;
  };


  getNewIndex = (chainName, formBuilderChains) => {
    let idx = null;
    for (let i = 0; i < formBuilderChains.length; i++) {
      if (formBuilderChains[i].name === chainName) {
        idx = i;
      }
    }
    return idx;
  };

  componentWillUpdate(nextProps, prevProps) {
    const {formBuilderChains, match: {params: {chainName}}} = nextProps;
    if (this.state.chainIndex !== null) {
      if (chainName && formBuilderChains.length > 0 && chainName !== prevProps.chainName) {

        if (formBuilderChains[this.state.chainIndex].name !== chainName) {
          let idx = this.getNewIndex(chainName,formBuilderChains);
          if (idx !== null) {
            const filterData = {
              ...this.state,
              ...{chainIndex: idx},
            };
            this.setState(filterData, () => {
              this.fetchData()
            });
          }
        }
      }
    } else {
      if (chainName && formBuilderChains.length > 0 && chainName !== prevProps.chainName) {
        let idx = this.getNewIndex(chainName,formBuilderChains);
        if (idx !== null) {
          const filterData = {
            ...this.state,
            ...{chainIndex: idx},
          };
          this.setState(filterData, () => {
            this.fetchData()
          });
        }
      }
    }
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
    if (this.state.dateTo.isAfter(dateFrom)) {
      this.setState({dateFrom}, () => {
        this.fetchData()
      })
    } else {
      this.props.pushError('Дата в поле "Дата запуска от" не может быть позднее даты в поле "Дата запуска до"');
    }
  };

  changeDateTo = (dateTo) => {
    if (dateTo.isAfter(this.state.dateFrom)) {
      this.setState({dateTo}, () => {
        this.fetchData()
      })
    } else {
      this.props.pushError('Дата в поле "Дата запуска от" не может быть позднее даты в поле "Дата запуска до"');
    }
  };

  renderFormBody = () => {
    return (<div className={'view-results-table'}>
      <BootstrapTable keyField='id'
                      data={this.props.directoryData}
                      columns={this.columns}
                      defaultSorted={this.defSort}
                      pagination={paginationFactory()}
                      noDataIndication={"Нет данных по запросу"}
                      filter={filterFactory()}
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
    moment.locale('ru')
    const {formBuilderChains, notifications} = this.props;
    const {chainIndex, dateFrom, dateTo} = this.state;
    const chainsForSelect = formBuilderChains.map((chain, index) => {
      return {label: chain.name, value: index}
    });

    const searchParams = (
      <div className={'search-params'}>
        <Select
          key={'selectChainElement'}
          options={chainsForSelect}
          wrapperStyle={{position: 'relative', zIndex: '10'}}
          onChange={(opt) => this.setFilter({chainIndex: opt.value})}
          clearable={false}
          value={chainIndex !== null ?
            {label: formBuilderChains[chainIndex].name, value: chainIndex}
            : {label: 'Выберите цепочку...', value: 'Выберите цепочку...'}}
          style={{borderRadius: '4px 4px 4px 4px'}}
          shouldKeyDownEventCreateNewOption={key => key.keyCode = !188}
          promptTextCreator={name => name}
          noResultsText={'Результаты не найдены'}
        />
        <span>Дата запуска от:</span>
        <DatePicker onChange={this.changeDateFrom}
                    selected={dateFrom}
                    locale="ru-RU"
                    dateFormat="DD.MM.YYYY"
                    todayButton='Сегодня'
        />
        <span>Дата запуска до:</span>
        <DatePicker onChange={this.changeDateTo}
                    selected={dateTo}
                    locale="ru-RU"
                    dateFormat="DD.MM.YYYY"
                    todayButton='Сегодня'/>
      </div>
    );

    return (
      <div style={{height: '100%'}}>
        <Header/>
        {searchParams}
        {chainIndex !== null && formBuilderChains[chainIndex]
          ? this.renderFormBody()
          : <Alert className={'chain-not-selected-alert'}>Для отображения данных по прогонам необходимо указать
            цепочку</Alert>}
        <Notifications notifications={notifications}/>
      </div>
    )
  }
}

export default DataDirectoryPage
