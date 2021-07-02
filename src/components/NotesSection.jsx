import { Component } from "react";
import './NotesSection.css'
import { Card, CardTitle, CardText } from 'reactstrap';

export class NotesSection extends Component {
    constructor() {
      super();
      this.state = {
        showNotes: false,
        notes: [
          {id: 1, title: "Fitness", note_body: "Fitness means different things to different people and Health has something for everyone, whether you’re just getting started with a workout routine or have been training since before TikTok was a thing."},
          {id: 2, title: "Cricket", note_body: "Australia chief selector expects players to forgo IPL if it clashes with planned T20 tri-series.Is Chris Gayle really 41? Chris Gayle, 41, pulls off a cartwheel celebration, Dale Steyn calls him 'coolest cricketer alive'."},
          {id: 3, title: "AUDI Car", note_body: "German luxury car manufacturer Audi on Thursday said it is offering complimentary scheduled service along with sanitisation to its existing customers who are doctors."}
        ]
      };
    }
    
    render () {
      const notes = this._getNotes();
      let noteNodes;
      let buttonText = 'Show Notes';
      
      if (this.state.showNotes) {
        buttonText = 'Hide Notes';
        noteNodes = <div className="grid-container">{notes}</div>;
      }
      
      return(
        <div className="note-box " >
          <h2>Note-Taking Application</h2>
          <NoteForm addNote={this._addNote.bind(this)}/>
          <button id="note-reveal" onClick={this._handleClick.bind(this)}>
            {buttonText}
          </button>
          <h4 style={{textAlign:"center"}}>
            {this._getNotesTitle(notes.length)}
          </h4>
          {noteNodes}
        </div>  
      );
    } 
    
    _addNote(title, note_body) {
      const note = {
        id: this.state.notes.length + 1,
        title,
        note_body
      };
      this.setState({ notes: this.state.notes.concat([note]) }); 
    }
    
    _handleClick() {
      this.setState({
        showNotes: !this.state.showNotes
      });
    }
    _deleteNote(id) {
      const notes = this.state.notes.filter(note => note.id !== id);
      this.setState({ notes: notes }); 
    }  
    _getNotes() {    
      return this.state.notes.map((note) => { 
        return (
         
          <Card  style={{ padding:'20px',backgroundColor: '#132a79', borderColor: '#333',boxShadow: '1px 2px 2px #fff',borderRadius:"10px"}}>
             <CardTitle tag="h3">{note.title}</CardTitle>
             <CardText className="note-body">{note.note_body}</CardText>
        <button  className="note-footer-delete" onClick={() =>this._deleteNote(note.id)}>Delete Note</button>
        </Card>
      
        ); 
        
      });
    }
    
    _getNotesTitle(noteCount) {
      if (noteCount === 0) {
        return 'No Notes Yet';
      } else if (noteCount === 1) {
        return "1 Note";
      } else {
        return `${noteCount} Notes`;
      }
    }
  } 
  

class NoteForm extends Component {
    render() {
      return (
        <form className="note-form" onSubmit={this._handleSubmit.bind(this)}>
          <div className="note-form-fields">
            <input placeholder="Title" required ref={(input) => this._title = input}></input><br />
            <textarea placeholder="Note" rows="4" required ref={(textarea) => this._note_body = textarea}></textarea>
          </div>
          <div className="note-form-actions">
            <button className="note-section-button" type="submit">Add Note </button>
          </div>
        </form>
      );
    } 
    
    _handleSubmit(event) { 
      event.preventDefault();  
      let title = this._title;
      let note_body = this._note_body;
      this.props.addNote(title.value, note_body.value);
      
    }
  } 
  
  
  