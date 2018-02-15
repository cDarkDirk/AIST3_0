import React from 'react'
import {Button, Jumbotron} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {Image, Row, Col, Grid, FormControl, Thumbnail, FormGroup, ControlLabel, Form, Checkbox, Dropdown} from "react-bootstrap"
import jenkImage from '../../assets/jenkins-butler-vertical.png'
import chainBuilderICO from '../../assets/Chain.png'



export default () => {
  return (

    <div className='container'>
      <Jumbotron>
        <h1>Home</h1>




        <Grid>
          <Row>
            <Col xs={6} md={3}>
              <p><Link to={'/chaineditor'}><Image src={jenkImage}/></Link></p>
            </Col>
            <Col xs={6} md={3}>
              <p><Link to={'/chaineditor'}><Thumbnail alt="171x171" src={chainBuilderICO} /></Link></p>
            </Col>
            <Col xs={6} md={3}>
              <Thumbnail href="#" alt="171x180" src="/assets/thumbnail.png" />
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={3}>
              <p><Link to={'/chaineditor'}><Thumbnail alt="171x171" src={jenkImage} /></Link></p>
            </Col>
            <Col xs={6} md={3}>
              <Thumbnail href="#" alt="171x180" src="/assets/jenkins-butler-vertical.png" />
            </Col>
            <Col xs={6} md={3}>
              <Thumbnail href="#" alt="171x180" src="/assets/thumbnail.png" />
            </Col>
          </Row>
        </Grid>

        <p><Link to={'/chaineditor'}><Button bsSize="large">Chain editor</Button></Link></p>
        <p><Link to={'/launcher'}><Button bsSize="large">Launcher</Button></Link></p>
        <p><Link to={'/formbuilder'}><Button bsSize="large">Form builder</Button></Link></p>
        <p><Link to={'/testbuilder'}><Button bsSize="large">Test builder</Button></Link></p>
        <p><Link to={'/dataTemplates'}><Button bsSize="large">Data Templates builder</Button></Link></p>
      </Jumbotron>


    </div>
  )

}
