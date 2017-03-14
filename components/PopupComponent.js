import React, {Component} from 'react';
import { render } from 'react-dom';

export default class PopupComponent extends Component {
	render() {
		return (
			<div id={ this.props.modalId} className="modal fade" role="dialog">
  				<div className="modal-dialog">
				    <div className="modal-content">
				      <div className="modal-header">
				        <button type="button" className="close" data-dismiss="modal">&times;</button>
				        <h4 className="modal-title">{ this.props.popupData.title }</h4>
				      </div>
				      <div className="modal-body">
				        <p>{ this.props.popupData.body }</p>
				      </div>
				      <div className="modal-footer">
				       { this.props.buttonClick ? (
				      		<button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.props.buttonClick}>
				        		Close
				        	</button>
        				) : (
					        <button type="button" className="btn btn-default" data-dismiss="modal">
					        	Close
					        </button>
					    )}
				      </div>
				    </div>
			  	</div>
			</div>
    	)
    }
}