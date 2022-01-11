import React, { Component } from 'react';
import {
  Button, Grid, Input, Icon,
} from 'semantic-ui-react';
import '~/app/style/sectionItem.css';
import { observer } from 'mobx-react';
import { SectionStore } from '~/app/service';

interface Props {
  index: number;
}

interface State {
  isMoreBtnClicked: boolean;
  isEditBtnClicked: boolean;
}

@observer
class SectionItem extends Component<Props> {
  private readonly moreRef: React.RefObject<any>;

  private readonly sectionEditRef: React.RefObject<any>;

  state: State = {
    isMoreBtnClicked: false,
    isEditBtnClicked: false,
  };

  constructor(props: Props) {
    super(props);

    this.moreRef = React.createRef();
    this.sectionEditRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.initMoreBtn);
  }

  componentDidUpdate() {
    SectionStore.saveItem();

    // console.log('item updated');
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.initMoreBtn);
  }

  /**
   * Item Edit
   */
   editSection = () => {
     this.setState({ isEditBtnClicked: false });

     // console.log('item edited');
   };

   /**
   * Item Edit: Key = Enter
   */
   handleEditKeyPress = (e: any) => {
     if (e.key === 'Enter') {
       this.editSection();
     }
   };

   /**
    * Item Delete
    */
   deleteSection = () => {
     const { index } = this.props;

     SectionStore.deleteSection(SectionStore.sectionList[index].index);
   };

   /**
    * Initialize More Button
    */
   initMoreBtn = (event: any) => {
     if (!this.moreRef.current.contains(event.target)) {
       this.setState({ isMoreBtnClicked: false });
     }
   };

   render() {
     const { index } = this.props;
     const { sectionList } = SectionStore;
     const {
       isMoreBtnClicked, isEditBtnClicked,
     } = this.state;

     return (
       <>
         <Grid.Row className="section-item">
           <Input
             className={ `edit-input title action ${isEditBtnClicked ? '' : 'hide'}` }
           >
             <input
               value={ sectionList[index].title }
               onChange={ (e: any) => {
                 sectionList[index].title = e.target.value;
               } }
               onKeyPress={ this.handleEditKeyPress }
               ref={ this.sectionEditRef }
             />
             <Button icon="check" onClick={ this.editSection } />
           </Input>

           <Grid.Column width={ 16 }>
             <span className={ `section-title ${isEditBtnClicked ? 'hide' : ''}` }>
               { sectionList[index].title }
             </span>

             <div ref={ this.moreRef } style={ { marginLeft: 'auto' } }>
               <Button.Group>
                 <Button
                   className="more-btn"
                   icon="ellipsis horizontal"
                   compact
                   onClick={ () => {
                     this.setState({ isMoreBtnClicked: !isMoreBtnClicked });
                   } }
                 />

                 <Button
                   className={ `del-btn ${isMoreBtnClicked ? 'shown' : ''}` }
                   icon="trash alternate outline"
                   compact
                   onClick={ this.deleteSection }
                 />
                 <Button
                   className={ `edit-btn ${isMoreBtnClicked ? 'shown' : ''}` }
                   icon="edit"
                   compact
                   onClick={ () => {
                     this.setState({
                       isEditBtnClicked: true,
                       isMoreBtnClicked: !isMoreBtnClicked,
                     });
                     this.sectionEditRef.current.focus();
                   } }
                 />
               </Button.Group>
             </div>
           </Grid.Column>
         </Grid.Row>
       </>
     );
   }
}

export default SectionItem;
