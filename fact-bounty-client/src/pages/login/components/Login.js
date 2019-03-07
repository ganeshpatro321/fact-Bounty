import React, {Component} from 'react'
import PropTypes          from 'prop-types'
import {connect}          from 'react-redux'
import classnames         from 'classnames'

import compose          from 'recompose/compose'
import Avatar           from '@material-ui/core/Avatar'
import Button           from '@material-ui/core/Button'
import CssBaseline      from '@material-ui/core/CssBaseline'
import FormControl      from '@material-ui/core/FormControl'
import Input            from '@material-ui/core/Input'
import InputLabel       from '@material-ui/core/InputLabel'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Paper            from '@material-ui/core/Paper'
import Typography       from '@material-ui/core/Typography'
import withStyles       from '@material-ui/core/styles/withStyles'
import Modal            from '@material-ui/core/Modal'

import {loginUser} from '../actions/authActions'
// import '../styles/login.sass';

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 12,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
})

class Login extends Component {
	constructor() {
		super()
		this.state = {
			email: '',
			password: '',
			errors: {},
			modalOpen: false
		}
	}

	componentDidMount() {
		// If logged in and user navigates to Login page, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard')
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/dashboard') // push user to dashboard when they login
		}
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			})
		}
	}

	onChange = e => {
		this.setState({[e.target.id]: e.target.value})
	}
	onSubmit = e => {
		e.preventDefault()
		const userData = {
			email: this.state.email,
			password: this.state.password
		}
		this.props.loginUser(userData) // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
	}

	handleOpen = () => {
		this.setState({ modalOpen: true });
	};


	handleClose = () => {
		this.setState({ modalOpen: false });
	};

	render() {
		const {errors} = this.state
		return (
			<main className={this.props.classes.main}>
				<CssBaseline/>
				<Paper className={this.props.classes.paper}>
					<Avatar className={this.props.classes.avatar}>
						<LockOutlinedIcon/>
					</Avatar>
					<Typography component="h1" variant="h5">
						Login
					</Typography>
					<form noValidate onSubmit={this.onSubmit} className={this.props.classes.form}>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="email">Email Address</InputLabel>
							<Input onChange={this.onChange}
								   value={this.state.email}
								   error={errors.email}
								   id="email"
								   type="email"
								   className={classnames('', {
									   invalid: errors.email || errors.emailnotfound
								   })}/>
							<span className="red-text">
									{errors.email}
								{errors.emailnotfound}
								</span>
						</FormControl>

						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="password">Password</InputLabel>
							<Input onChange={this.onChange}
								   value={this.state.password}
								   error={errors.password}
								   id="password"
								   type="password"
								   className={classnames('', {
									   invalid: errors.password || errors.passwordincorrect
								   })}/>
							<span className="red-text">
									{errors.password}
								{errors.passwordincorrect}
								</span>
						</FormControl>

						<Button type="submit" fullWidth variant="contained"
								color="primary" className={this.props.classes.submit}>
							Login
						</Button>
						<Button onClick={this.handleOpen}>Forgot Password?</Button>
					</form>
				</Paper>
				<Modal 
					open={this.state.modalOpen}
					onClose={this.handleClose}
				>
				<main className={this.props.classes.main}>
				<Paper className={this.props.classes.paper}>
				<Avatar className={this.props.classes.avatar}>
						<LockOutlinedIcon/>
				</Avatar>
				<Typography component="h1" variant="h5">
						Forgot Password?
				</Typography>
				<Typography variant="body1">
						Enter your email address, we will send you a reset link!
				</Typography>
				<form noValidate onSubmit={this.onEmailSubmit} className={this.props.classes.form}>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="email">Email Address</InputLabel>
							<Input onChange={this.onChange}
								   value={this.state.email}
								   error={errors.email}
								   id="email"
								   type="email"
								   className={classnames('', {
									   invalid: errors.email || errors.emailnotfound
								   })}/>
							<span className="red-text">
									{errors.email}
								{errors.emailnotfound}
								</span>
						</FormControl>		   
				</form>
				</Paper>
				</main>
				</Modal>
			</main>

		)
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
})

export default compose(
	withStyles(styles, {
		name: 'Login',
	}),
	connect(
		mapStateToProps,
		{loginUser}
	)
)(Login)
