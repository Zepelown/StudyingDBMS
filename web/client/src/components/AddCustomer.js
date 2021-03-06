import React from 'react';
import { post } from 'axios';

class AddCustomer extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			file:null,
			userName: '',
			birthday: '',
			gender: '',
			job: '',
			fileName: ''
		}
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
		this.handleFileChanage = this.handleFileChanage.bind(this)
		this.handleValueChanage = this.handleValueChanage.bind(this)
		this.addCustomer = this.addCustomer.bind(this)
	}
	
	handleFormSubmit(e) {
		e.preventDefault()
		this.addCustomer()
			.then((response) => {
			console.log(response.data);
			this.props.stateRefresh();
		})
		
		this.setState({
			file: null,
			userName:'',
			birthday: '',
			gender: '',
			job: '',
			fileName: ''
		})
	}
	
	handleFileChanage(e) {
		this.setState({
			file: e.target.files[0],
			fileName: e.target.value
		});
	}
	
	
	handleValueChanage(e) {
		let nextState = {};
		nextState[e.target.name] = e.target.value;
		this.setState(nextState);
	}
	
	addCustomer() {
		const url = '/api/customers';
		const formData = new FormData();
		formData.append('image', this.state.file)
		formData.append('name', this.state.userName)
		formData.append('birthday', this.state.birthday)
		formData.append('gender', this.state.gender)
		formData.append('job', this.state.job)
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		
		return post(url, formData,config)
	}
	
	render() {
		return (
			<form onSubmit={this.handleFormSubmit}>
				<h1>고객 추가</h1>
				프로필 이미지: <input type="file" name="file"
							 file={this.state.file}
							 value={this.state.fileName}
							 onChange={this.handleFileChanage}/>
							<br/>
				이름: <input type="text" name="userName"
							value={this.state.userName}
							onChange={this.handleValueChanage}/>
							<br/>
				생년월일: <input type="text" name="birthday"
						  		value={this.state.birthday}
						  		onChange={this.handleValueChanage}/>
							<br/>
				성별: <input type="text" name="gender"
								value={this.state.gender}
								onChange={this.handleValueChanage}/>
							<br/>
				직업: <input type="text" name="job"
								value={this.state.job}
								onChange={this.handleValueChanage}/>
							<br/>
				<button type="submit">추가하기</button>
			</form>
		)
	}
}

export default AddCustomer