import React from 'react'
import {detect} from 'detect-browser'
import {Button, Modal} from 'react-bootstrap'
import "./style.css"

class BrowserAlert extends React.Component {

  state = {
    show: true,
  };

  handleDismiss = () => {
    this.setState({show: false})
  };

  alertTemplate = (text) => {
    return(
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title bsClass={"titleAlert"}>
          Внимание!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {text}
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle={"danger"}
                className="btn btn-default btn-sm"
                onClick={() => this.handleDismiss()}
        >Закрыть</Button>
      </Modal.Footer>
    </Modal.Dialog>
    )
  };

  alertForm() {
    const browser = detect();
    const version = browser.version.split('.')[0];
    if (browser.name !== 'chrome') {
      const message = `Уважаемый пользователь, рекомендуемым бразером для использования АИСТ является Google Chrome `+
      `(версии 61+). В других браузерах некоторые функции могут быть недоступны или работать некорректно`;
      return (this.alertTemplate(message));
    }
    if (version < 61) {
      const message = `Уважаемый пользователь, рекомендуемая версия Google Chrome: 61+. Ваша версия ` +
        `${browser.version}. В более ранних версиях Google Chrome некоторые функции могут быть недоступны или ` +
        `работать некорректно`;
      const notification = {
        level: "warning",
        message: message,
        autoDismiss: 0,
        action: {
          label: "Закрыть"
        }
      };
      this.props.setAlert(notification)
    }
    return null;
  }

  render () {
    return this.state.show ? this.alertForm() : null;
  }
}

export default BrowserAlert;
