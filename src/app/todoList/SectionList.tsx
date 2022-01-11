import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
  Segment, Grid, Button, Icon, Input,
} from 'semantic-ui-react';
import { SectionItem, ModalNoSectionName } from '~/app/todoList';
import { SectionStore } from '~/app/service';
import '~/app/style/sectionList.css';

interface SectionType {
  index: number;
  id: string;
  title: string;
}

interface State {
  isAddSectionBtnClicked: boolean;
  modalOpenNoSectionName: boolean;
}

@observer
class SectionList extends Component {
  private readonly sectionAddInputRef: React.RefObject<any>;

  private readonly addSectionRef: React.RefObject<any>;

  state: State = {
    isAddSectionBtnClicked: false,
    modalOpenNoSectionName: false,
  };

  constructor(props: any) {
    super(props);

    this.sectionAddInputRef = React.createRef();
    this.addSectionRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.initAddSectionBtn);
  }

  componentDidUpdate() {
    SectionStore.saveItem();

    // console.log('item updated');
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.initAddSectionBtn);
  }

  /**
   * Add Section to the List
   */
   addSection = () => {
     const index = SectionStore.sectionList.length > 0 ? SectionStore.sectionList[SectionStore.sectionList.length - 1].index + 1 : 1;

     if (SectionStore.sectionTitle === '') {
       this.setState({ modalOpenNoSectionName: true });
     }
     if (SectionStore.sectionTitle !== '') {
       SectionStore.addSection(index);
       SectionStore.initSection();
       this.setState({ isAddSectionBtnClicked: false });
     }
   }

   /**
   * Add Section: Key = Enter
   */
   handleAddKeyPress = (e: any) => {
     if (e.key === 'Enter') {
       this.addSection();
     }
   };

  /**
   * Initialize Add Section
   */
  initAddSectionBtn = (event: any) => {
    if (!this.addSectionRef.current.contains(event.target)) {
      this.setState({ isAddSectionBtnClicked: false });
    }
  };

  render() {
    const { sectionList } = SectionStore;
    const { isAddSectionBtnClicked, modalOpenNoSectionName } = this.state;

    return (
      <>
        <Segment className="section-list">
          <Grid style={ { margin: 0 } }>
            <Grid.Row className="section-item">
              <Grid.Column width={ 16 }>
                Overview
              </Grid.Column>
            </Grid.Row>

            { sectionList.map((data: SectionType, index: number) => (
              <SectionItem key={ data.id } index={ index } />
            )) }

            <div className="row" ref={ this.addSectionRef }>
              <Grid.Row className="add-section-wrapper">
                <Input
                  className={ `add-section-input action ${isAddSectionBtnClicked ? '' : 'hide'}` }
                >
                  <input
                    value={ SectionStore.sectionTitle }
                    onChange={ (e: any) => {
                      SectionStore.sectionTitle = e.target.value;
                    } }
                    onKeyPress={ this.handleAddKeyPress }
                    ref={ this.sectionAddInputRef }
                  />
                  <Button
                    icon="check"
                    onClick={ this.addSection }
                  />
                </Input>
                <Grid.Column width={ 16 }>
                  <Button
                    className={ `add-section-btn ${isAddSectionBtnClicked ? 'hide' : ''}` }
                    onClick={ () => {
                      this.setState({ isAddSectionBtnClicked: true });
                      this.sectionAddInputRef.current.focus();
                    } }
                  ><Icon name="add" />Add Section
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </div>
          </Grid>
        </Segment>

        <ModalNoSectionName
          modalOpen={ modalOpenNoSectionName }
          handleClose={ () => {
            this.setState({ modalOpenNoSectionName: false });
          } }
        />
      </>
    );
  }
}

export default SectionList;
