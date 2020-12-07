import React, {useState, useEffect} from 'react';
import './App.css';
import { useWeb3Context } from 'web3-react'

import { Spinner, Alert, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import { Box, Flex, Card, Heading, Text, Button, OutlineButton, Input, Textarea, Checkbox, Icon } from 'rimble-ui'
import {Container, Row,Col} from 'react-bootstrap'
import SupplyChainContractAbi from "./contracts/SupplyChain.json";
import swal from '@sweetalert/with-react';
import Header from './Components/header';
import Main from './Components/main';
let instance = null


function App() {
	
	const context = useWeb3Context();

	const [roles, setRoles] = useState([])
	const [activeTab, setActiveTab] = useState('1')
	const [isLoading, setIsLoading] = useState(true)
	const [trackState, setTrackState]= useState('10')
	const [logs, setLogs] = useState([])
	const [datas, setDatas]=useState([])
	const [datasa, setDatasa]=useState([])
	const [errMessage, setErrMessage] = useState('')
 

	useEffect(() => {
		if (context.connectorName === undefined) {
			if (window.web3 === undefined) {
				context.setConnector("Infura");
			} else {
				context.setConnector("MetaMask");
			}
		} else {
			if (context != null) {
//			const deployedNetwork = SupplyChainContract.networks[context.networkId];
			const deployedNetwork = SupplyChainContractAbi.networks[context.networkId];

				const supplychainInstance = new context.library.eth.Contract(
					SupplyChainContractAbi.abi,
					deployedNetwork && deployedNetwork.address,
				)
				instance = supplychainInstance
			}
		}
	}, [context])

	useEffect(() => {
    if (instance != null)
      currentAccountRoles()
			setTimeout(() => {
				setIsLoading(false)
			},3000)
			
	}, [context, context.account])

	
	const currentAccountRoles = async () =>{
		let myRoles = await instance.methods.whoAmI().call({from: context.account})
		addToLogs(myRoles)
		const keys = Object.keys(myRoles)
		const values = Object.values(myRoles)
		let updatedRoles = []
		for (var i = 6; i < 12; i++) {
			updatedRoles.push({role: keys[i], isAssgin: values[i]})
		}
		setRoles(updatedRoles)
	}

	const addMeTo = async (roleName) => {
		let tx
		try {
			switch(roleName) {
				case 'farmer':
					tx = await instance.methods.assignMeAsFarmer().send({from: context.account})
					break;
				case 'processor':
					tx = await instance.methods.assignMeAsProcessor(context.account).send({from: context.account})
					break;
				case 'manufacturer':
					tx = await instance.methods.assignMeAsManufacturer().send({from: context.account})
					break;
				case 'distributor':
					tx = await instance.methods.assignMeAsDistributor().send({from: context.account})
					break;
				case 'retailer':
					tx = await instance.methods.assignMeAsRetailer().send({from: context.account})
					break;
				case 'consumer':
					tx = await instance.methods.assignMeAsConsumer().send({from: context.account})
					break;
				default:
			}

			addTxToLogs(tx)
			currentAccountRoles()
		} catch(err) {
			setErrMessage(err.message)
		}
	}

	const removeMeFrom = async (roleName) => {
		let tx
		try {
			switch(roleName) {
				case 'farmer':
					tx = await instance.methods.renounceMeFromFarmer().send({from: context.account})
					break
				case 'processor':
					tx = await instance.methods.renounceMeFromProcessor().send({from: context.account})
					break
				case 'manufacturer':
					tx = await instance.methods.renounceMeFromManufacturer().send({from: context.account})
					break
				case 'distributor':
					tx = await instance.methods.renounceMeFromDistributor().send({from: context.account})
					break
				case 'retailer':
					tx = await instance.methods.renounceMeFromRetailer().send({from: context.account})
					break
				case 'consumer':
					tx = await instance.methods.renounceMeFromConsumer().send({from: context.account})
					break
				default:
			}

			addTxToLogs(tx)
			currentAccountRoles()
		} catch(err) {
			setErrMessage(err.message)
		}
	}

	const addProcessor= async() => {
		try {
			let tx = await instance.methods.addProcessor(
				document.getElementsByName("processorToBeAdded")[0].value,document.getElementsByName("nameProcessor")[0].value,
			).send({from: context.account})

			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}

	const addFarmer= async() => {
		try {
			let tx = await instance.methods.addFarmer(
				document.getElementsByName("farmerToBeAdded")[0].value,document.getElementsByName("nameFarmer")[0].value,
			).send({from: context.account})

			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}

	const addDistributor= async() => {
		try {
			let tx = await instance.methods.addDistributor(
				document.getElementsByName("distributorToBeAdded")[0].value,document.getElementsByName("nameDistributor")[0].value,
			).send({from: context.account})

			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}
	const addManufacturer= async() => {
		try {
			let tx = await instance.methods.addManufacturer(
				document.getElementsByName("ManufacturerToBeAdded")[0].value,document.getElementsByName("nameManufacturer")[0].value,
			).send({from: context.account})

			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}
	const addRetailer= async() => {
		try {
			let tx = await instance.methods.addRetailer(
				document.getElementsByName("retailerToBeAdded")[0].value,document.getElementsByName("nameRetailer")[0].value,
			).send({from: context.account})

			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}
	const addConsumer= async() => {
		try {
			let tx = await instance.methods.addConsumer(
				document.getElementsByName("consumerToBeAdded")[0].value,document.getElementsByName("nameConsumer")[0].value,
			).send({from: context.account})

			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}



	const addSiembra = async() => {
		try {
			let tx = await instance.methods.plantItem(
				document.getElementsByName("upc")[0].value,
				context.account,
				document.getElementsByName("farmerName")[0].value,
				document.getElementsByName("farmName")[0].value,
				document.getElementsByName("latitudFarm")[0].value,
				document.getElementsByName("longitudeFarm")[0].value,
				document.getElementsByName("detailsF")[0].value
			).send({from: context.account})
			addTxToLogs(tx)

		} catch(err) {
			setErrMessage(err.message)
		}
	}



	const addMaduracion = async() => {
		try {
			let tx = await instance.methods.growItem(
				document.getElementsByName("upc1")[0].value,
			).send({from: context.account})
			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}
	const addCosecha = async() => {
		try {
			let tx = await instance.methods.harvestItem(
				document.getElementsByName("upc2")[0].value,
			).send({from: context.account})
			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}
	const addProcesamiento = async() => {
		try {
			let tx = await instance.methods.processItem(
				document.getElementsByName("upc3")[0].value,
			).send({from: context.account})
			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}
	const addEmpaque = async() => {
		try {
			let tx = await instance.methods.packItem(
				document.getElementsByName("upc4")[0].value,
			).send({from: context.account})
			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}
	const addVenta = async() => {
		try {
			let priceInWei = context.library.utils.toWei(document.getElementsByName("ethPrice")[0].value)
			let tx = await instance.methods.sellItem(
				document.getElementsByName("upc5")[0].value,
				priceInWei
			).send({from: context.account})
			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}

	const addCompra = async() => {
		try {
			let priceInWei = context.library.utils.toWei(document.getElementsByName("ethPrice1")[0].value)
			let tx = await instance.methods.buyItem(
				document.getElementsByName("upc6")[0].value
			).send({
				from: context.account,
				value:priceInWei
			})
			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}

	const addEnvio= async() => {
		try {
			let tx = await instance.methods.shipItem(
				document.getElementsByName("upc7")[0].value,
			).send({from: context.account})
			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}

	const addRecepcion= async() => {
		try {
			let tx = await instance.methods.receiveItem(
				document.getElementsByName("upc8")[0].value,
			).send({from: context.account})
			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}
	const addCompraCliente= async() => {
		try {
			let tx = await instance.methods.purchaseItem(
				document.getElementsByName("upc9")[0].value,
			).send({from: context.account})
			addTxToLogs(tx)
		} catch(err) {
			setErrMessage(err.message)
		}
	}





	const fetchData1 = async() => {
		try {
			let udpc = document.getElementsByName("upc10")[0].value
			let CoffeeData = await instance.methods.fetchItemBufferOne(udpc).call({from: context.account});
			presentData1(CoffeeData)
		} catch(err) {
			
			setErrMessage(err.message)
		}
	}
	const fetchData2 = async() => {
		try {
			let udpc = document.getElementsByName("upc10")[0].value
			let CoffeeData2 = await instance.methods.fetchItemBufferTwo(udpc).call({from: context.account});
			presentData2(CoffeeData2)
		} catch(err) {
			
			setErrMessage(err.message)
		}
	}




	const addTxToLogs =  (tx) => {
		let txHash = tx.transactionHash
		let eventName = Object.keys(tx.events)[0]
		let eventValueName = Object.keys(tx.events[eventName]['returnValues'])[1]
		let eventValue = tx.events[eventName]['returnValues'][eventValueName]

		let updatedLogs = []
		let newLogHash = '$|>>Transaction Hash:' + txHash
		let newLogEvent ='|-----|Event:' + eventName + '(' + eventValueName + ': ' + eventValue + ' )'
		let tmpArr=[]
		tmpArr.push(newLogHash,newLogEvent)
		swal(tmpArr)
		updatedLogs.push(newLogHash,newLogEvent, ...logs)
		setLogs(updatedLogs)
	}

	const addToLogs = (_logObject) => {
		let updatedLogs = []
		let dataKeys = Object.keys(_logObject)
		let numberOfData = dataKeys.length
		let logy = ''

		for (var i = (numberOfData/2); i<numberOfData; i++) {
			logy += dataKeys[i] + ': ' + _logObject[dataKeys[i]] +', '
		}	
		swal(logy)
		updatedLogs.push(logy, ...logs)
		setLogs(updatedLogs)
	}


	const presentData1 = (_logObject) => {
		let updatedData = []
		let dataKeys = Object.keys(_logObject)
		let upc="Codigo Unico Item -UPC:"+_logObject.itemUPC+"\n"
		let nombreA="Nombre Agricultor:"+_logObject.originFarmName +_logObject.originFarmID+"\n"
		let nombreG="Nombre Granja:"+_logObject.originFarmInformation+"\n"
		let lat="Latitud:"+_logObject.originFarmLatitude+"\n"
		let long="Longitud:"+_logObject.originFarmLongitude
		let dataAux= upc+nombreA+nombreG+lat+long
		updatedData.push(dataAux, ...datas)
		setDatas(updatedData)
	}
	const presentData2 = (_logObject) => {
		let updatedData1 = []
		let dataKeys = Object.keys(_logObject)
		let details="Detalles:"+_logObject.productNotes+"\n"
		let state1=_logObject.itemState
		let state="Estado:"+_logObject.itemState+"\n"
		let dis="distribuidor ID:"+_logObject.distributorID+"\n"
		let re="retailer ID:"+_logObject.retailerID+"\n"
		let co="consumidor ID:"+_logObject.consumerID
		let dataAux= details+state+dis+re+co
		updatedData1.push(dataAux, ...datasa)
		setTrackState(state1)
		setDatas(updatedData1)

	}

	//states
	if (isLoading) {
		return <div className='centered-Loader'><Spinner style={{ width: '10rem', height: '10rem' }} type="grow" color="danger"/></div>
		
	}
	
	else {
		
		if (context.connectorName=="Infura"){
			swal(
				<div>
				  <h1>Necesitas <b>Metamask</b> </h1>        
				  <p>Por favor para poder usar la aplicación instala metamask</p>
				  <a href="https://metamask.io/download.html" target="_blank">Instalar Metamask</a> 
				  <p>Una vez instalado regresa y recarga la pagina</p>
				</div>
			  )
		}else{
			if(context.account=="0xc901805757Fba45083546AAc8A297213bEf5806A"){
				return (
								<div>
								{context.networkId === 4 || context.networkId >= 5 ? 
									<Alert style={{textAlign: 'center'}} color="success"> 
										 Conector Activo: {context.connectorName}, --- Cuenta activa: {context.account},  ---  Id de la Red: {context.networkId}
									</Alert>
									:<Alert style={{textAlign: 'center'}} color="danger">
										Debes conectar tu dirección de wallet con la aplicación empleando MetaMask en la red <b>RINKEBY</b> para poder hacer uso de la aplicación.{context.error}
									</Alert>
								}
								<Header/>
				
								<Nav tabs style={{justifyContent: 'center'}}>
									<NavItem>
										<NavLink 
											active={ activeTab === '1' }
											href='#'
											onClick={() => { setActiveTab('1')}}
										>
											Acerca del Proyecto
									</NavLink>
									</NavItem>
									<NavItem>
										<NavLink 
											active={ activeTab === '2' }
											href='#'
											onClick={() => { setActiveTab('2')}}
										>
											Administración
										</NavLink>
									</NavItem>
				
				
									<NavItem>
										<NavLink 
											active={ activeTab === '4' }
											href='#'
											onClick={() => { setActiveTab('4')}}
										>
											Consultar Trazabilidad
										</NavLink>
									</NavItem>
								</Nav>
				
								<TabContent activeTab={activeTab}>
									<TabPane tabId='1'>
										<Main/>
									</TabPane>
				
									<TabPane tabId='2'>
										<Box  m={5} p={10}>
											<Flex style={{justifyContent: 'center'}}>
												{roles.map(role => (
													<Box  p={20} key={role.id} Flex>
														<Icon key={role.id} style={{textAlign: 'center'}} size='30' name={role.isAssgin ? 'Beenhere' : 'Cancel'}/>
														<Text size='5' style={{textAlign: 'center'}} >{role.role}</Text>
				
													</Box>
													
												))}
											</Flex>

											<Container>
												<Row className="justify-content-md-center">
													<Col>											
														<Card  p={3} Flex >
															<Heading>Añadir Agricultor </Heading>
															<Text color='red' >Solo Master Address</Text>
															<Input type='text' placeholder='new farmer address' name='farmerToBeAdded'/>
															<Input type='text'  placeholder='new farmer name' name='nameFarmer'/>
															<OutlineButton pt ={1} mt={1} onClick={() => addFarmer()}>Agregar</OutlineButton>
														</Card>
													</Col>
													<Col>
														<Card  p={3} Flex >
															<Heading>Añadir Procesador</Heading>
															<Text color='red' >Solo Master Address</Text>
															<Input type='text'  placeholder='new processor address' name='processorToBeAdded'/>
															<Input type='text'  placeholder='new processor name' name='nameProcessor'/>
															<OutlineButton pt ={1} mt={1} onClick={() => addProcessor()}>Agregar</OutlineButton>
														</Card>
													</Col>
													<Col>
														<Card  p={3} Flex >
															<Heading>Añadir Consumidor</Heading>
															<Text color='red' >Solo Master Address</Text>
															<Input type='text'  placeholder='new manufacturer address' name='consumerToBeAdded'/>
															<Input type='text' placeholder='new manufacturer name' name='nameConsumer'/>
															<OutlineButton pt ={1} mt={1} onClick={() => addConsumer()}>Agregar</OutlineButton>
														</Card>
													</Col>
												</Row>
												<Row className="justify-content-md-center">
												<Col>
												<Card  p={3} Flex >
													<Heading>Añadir Distribuidor</Heading>
													<Text color='red' >Solo Master Address</Text>
													<Input type='text'  placeholder='new distributor address' name='distributorToBeAdded'/>
													<Input type='text' placeholder='new distributor name' name='nameDistributor'/>
													<OutlineButton pt ={1} mt={1} onClick={() => addDistributor()}>Agregar</OutlineButton>
												</Card>
												</Col>
												<Col/>
												<Col>
													<Card p={3} Flex >
														<Heading>Añadir Retailer</Heading>
														<Text color='red' >Solo Master Address</Text>
														<Input type='text'  placeholder='new retailer address' name='retailerToBeAdded'/>
														<Input type='text' placeholder='new retailer name' name='nameRetailer'/>
														<OutlineButton pt ={1} mt={1} onClick={() => addRetailer()}>Agregar</OutlineButton>
													</Card>
												</Col>
											</Row>
											</Container>
										</Box>
									</TabPane>
				
				
				
				
									<TabPane tabId='4'>
										<Box m={10} p={20}>
											<Container>
												<Row className="justify-content-md-center">
													<Col>
														<Card>
															<Heading>Consulta Datos</Heading>
															<Input type='text' p ={3} m={1} placeholder='Codigo Item UPC' name='upc10'/>
															<Button size='mediam' p ={3} m={1} onClick={()=> {fetchData1()}}>Consultar Detalles</Button>
															<Button size='mediam' p ={3} m={1} onClick={()=> {fetchData2()}}>Consultar Trazabilidad</Button>
							
						
						
														</Card>
													</Col>
													<Col>
														<Card>
						
														{datas.map(data => (
														<Text.p key ={data.id}>{data}</Text.p>
														))}
														
														</Card>
													</Col>
												</Row>
					
											</Container>
												{(() => {
						switch(trackState) {
							case '0':
							return 			<Card style={{textAlign: 'center'}}>
											
												<span class="badge badge-pill badge-success">Siembra</span>
												<span class="badge badge-pill badge-dark">Maduración</span>
												<span class="badge badge-pill badge-dark">Cosecha</span>
												<span class="badge badge-pill badge-dark">Procesamiento</span>
												<span class="badge badge-pill badge-dark">Empaque</span>
												<span class="badge badge-pill badge-dark">En venta</span>
												<span class="badge badge-pill badge-dark">Vendido</span>
												<span class="badge badge-pill badge-dark">Enviado</span>								
												<span class="badge badge-pill badge-dark">Recibido</span>
												<span class="badge badge-pill badge-dark">Registro CF</span>
											</Card>;
							case '1':
							return 			<Card style={{textAlign: 'center'}}>
											
												<span class="badge badge-pill badge-success">Siembra</span>
												<span class="badge badge-pill badge-success">Maduración</span>
												<span class="badge badge-pill badge-dark">Cosecha</span>
												<span class="badge badge-pill badge-dark">Procesamiento</span>
												<span class="badge badge-pill badge-dark">Empaque</span>
												<span class="badge badge-pill badge-dark">En venta</span>
												<span class="badge badge-pill badge-dark">Vendido</span>
												<span class="badge badge-pill badge-dark">Enviado</span>								
												<span class="badge badge-pill badge-dark">Recibido</span>
												<span class="badge badge-pill badge-dark">Registro CF</span>
				
												<span class="badge badge-pill badge-dark">Siembra</span>
											</Card>;
							case '2':
							return 			<Card style={{textAlign: 'center'}}>
											
												<span class="badge badge-pill badge-success">Siembra</span>
												<span class="badge badge-pill badge-success">Maduración</span>
												<span class="badge badge-pill badge-success">Cosecha</span>
												<span class="badge badge-pill badge-dark">Procesamiento</span>
												<span class="badge badge-pill badge-dark">Empaque</span>
												<span class="badge badge-pill badge-dark">En venta</span>
												<span class="badge badge-pill badge-dark">Vendido</span>
												<span class="badge badge-pill badge-dark">Enviado</span>								
												<span class="badge badge-pill badge-dark">Recibido</span>
												<span class="badge badge-pill badge-dark">Registro CF</span>
				
												<span class="badge badge-pill badge-dark">Siembra</span>
											</Card>;
							case '3':
							return 			<Card style={{textAlign: 'center'}}>
											
												<span class="badge badge-pill badge-success">Siembra</span>
												<span class="badge badge-pill badge-success">Maduración</span>
												<span class="badge badge-pill badge-success">Cosecha</span>
												<span class="badge badge-pill badge-success">Procesamiento</span>
												<span class="badge badge-pill badge-dark">Empaque</span>
												<span class="badge badge-pill badge-dark">En venta</span>
												<span class="badge badge-pill badge-dark">Vendido</span>
												<span class="badge badge-pill badge-dark">Enviado</span>								
												<span class="badge badge-pill badge-dark">Recibido</span>
												<span class="badge badge-pill badge-dark">Registro CF</span>
				
											</Card>;
							case '4':
							return 			<Card style={{textAlign: 'center'}}>
											
												<span class="badge badge-pill badge-success">Siembra</span>
												<span class="badge badge-pill badge-success">Maduración</span>
												<span class="badge badge-pill badge-success">Cosecha</span>
												<span class="badge badge-pill badge-success">Procesamiento</span>
												<span class="badge badge-pill badge-success">Empaque</span>
												<span class="badge badge-pill badge-dark">En venta</span>
												<span class="badge badge-pill badge-dark">Vendido</span>
												<span class="badge badge-pill badge-dark">Enviado</span>								
												<span class="badge badge-pill badge-dark">Recibido</span>
												<span class="badge badge-pill badge-dark">Registro CF</span>
				
											</Card>;
							case '5':
							return 			<Card style={{textAlign: 'center'}}>
											
												<span class="badge badge-pill badge-success">Siembra</span>
												<span class="badge badge-pill badge-success">Maduración</span>
												<span class="badge badge-pill badge-success">Cosecha</span>
												<span class="badge badge-pill badge-success">Procesamiento</span>
												<span class="badge badge-pill badge-success">Empaque</span>
												<span class="badge badge-pill badge-success">En venta</span>
												<span class="badge badge-pill badge-dark">Vendido</span>
												<span class="badge badge-pill badge-dark">Enviado</span>								
												<span class="badge badge-pill badge-dark">Recibido</span>
												<span class="badge badge-pill badge-dark">Registro CF</span>
				
				
											</Card>;
							case '6':
							return 			<Card style={{textAlign: 'center'}}>
											
												<span class="badge badge-pill badge-success">Siembra</span>
												<span class="badge badge-pill badge-success">Maduración</span>
												<span class="badge badge-pill badge-success">Cosecha</span>
												<span class="badge badge-pill badge-success">Procesamiento</span>
												<span class="badge badge-pill badge-success">Empaque</span>
												<span class="badge badge-pill badge-success">En venta</span>
												<span class="badge badge-pill badge-success">Vendido</span>
												<span class="badge badge-pill badge-dark">Enviado</span>								
												<span class="badge badge-pill badge-dark">Recibido</span>
												<span class="badge badge-pill badge-dark">Registro CF</span>
				
											</Card>;
							case '7':
							return 							<Card style={{textAlign: 'center'}}>
											
												<span class="badge badge-pill badge-success">Siembra</span>
												<span class="badge badge-pill badge-success">Maduración</span>
												<span class="badge badge-pill badge-success">Cosecha</span>
												<span class="badge badge-pill badge-success">Procesamiento</span>
												<span class="badge badge-pill badge-success">Empaque</span>
												<span class="badge badge-pill badge-success">En venta</span>
												<span class="badge badge-pill badge-success">Vendido</span>
												<span class="badge badge-pill badge-success">Enviado</span>								
												<span class="badge badge-pill badge-dark">Recibido</span>
												<span class="badge badge-pill badge-dark">Registro CF</span>
				
				
											</Card>;
							case '8':
							return 			<Card style={{textAlign: 'center'}}>
											
												<span class="badge badge-pill badge-success">Siembra</span>
												<span class="badge badge-pill badge-success">Maduración</span>
												<span class="badge badge-pill badge-success">Cosecha</span>
												<span class="badge badge-pill badge-success">Procesamiento</span>
												<span class="badge badge-pill badge-success">Empaque</span>
												<span class="badge badge-pill badge-success">En venta</span>
												<span class="badge badge-pill badge-success">Vendido</span>
												<span class="badge badge-pill badge-success">Enviado</span>								
												<span class="badge badge-pill badge-success">Recibido</span>
												<span class="badge badge-pill badge-dark">Registro CF</span>
											</Card>;
							case '9':
							return 			<Card style={{textAlign: 'center'}}>
											
												<span class="badge badge-pill badge-success">Siembra</span>
												<span class="badge badge-pill badge-success">Maduración</span>
												<span class="badge badge-pill badge-success">Cosecha</span>
												<span class="badge badge-pill badge-success">Procesamiento</span>
												<span class="badge badge-pill badge-success">Empaque</span>
												<span class="badge badge-pill badge-success">En venta</span>
												<span class="badge badge-pill badge-success">Vendido</span>
												<span class="badge badge-pill badge-success">Enviado</span>								
												<span class="badge badge-pill badge-success">Recibido</span>
												<span class="badge badge-pill badge-success">Registro CF</span>
				
				
											</Card>;												
							default:
							return 			<Card style={{textAlign: 'center'}}>
											
												<span class="badge badge-pill badge-dark">Siembra</span>
												<span class="badge badge-pill badge-dark">Maduración</span>
												<span class="badge badge-pill badge-dark">Cosecha</span>
												<span class="badge badge-pill badge-dark">Procesamiento</span>
												<span class="badge badge-pill badge-dark">Empaque</span>
												<span class="badge badge-pill badge-dark">En venta</span>
												<span class="badge badge-pill badge-dark">Vendido</span>
												<span class="badge badge-pill badge-dark">Enviado</span>								
												<span class="badge badge-pill badge-dark">Recibido</span>
				
											</Card>;
						}
												})()}
										</Box>
									</TabPane>
				
								</TabContent>
				
								<Box>
									<Card  color="green" bg="black" height={'auto'}>
										<Heading>LOGS:</Heading>
										{logs.map(logy => (
												<Text.p key ={logy.id} color='green'>{logy}</Text.p>
										))}
										<Heading color="red">ERROR:</Heading>
										<Text color="red">{errMessage}</Text>
									</Card>
								</Box>
							</div>
							)
				}else{
					return (
								<div>
								{context.networkId === 4 || context.networkId >= 5 ? 
									<Alert style={{textAlign: 'center'}} color="success"> 
										 Conector Activo: {context.connectorName}, --- Cuenta activa: {context.account},  ---  Id de la Red: {context.networkId}
									</Alert>
									:<Alert style={{textAlign: 'center'}} color="danger">
										Debes conectar tu dirección de wallet con la aplicación empleando MetaMask en la red <b>RINKEBY</b> para poder hacer uso de la aplicación.{context.error}
									</Alert>
								}
								<Header/>
				
								<Nav tabs style={{justifyContent: 'center'}}>
									<NavItem>
										<NavLink 
											active={ activeTab === '1' }
											href='#'
											onClick={() => { setActiveTab('1')}}
										>
											Acerca del Proyecto
									</NavLink>
									</NavItem>

									<NavItem>
										<NavLink 
											active={ activeTab === '3' }
											href='#'
											onClick={() => { setActiveTab('3')}}
										>
											Cadena de Suministros del Café
										</NavLink>
									</NavItem>
				
									<NavItem>
										<NavLink 
											active={ activeTab === '4' }
											href='#'
											onClick={() => { setActiveTab('4')}}
										>
											Consultar Trazabilidad
										</NavLink>
									</NavItem>
								</Nav>
				
								<TabContent activeTab={activeTab}>
									<TabPane tabId='1'>
										<Main/>
									</TabPane>
								
				
									<TabPane tabId='3'>
										<Nav tabs style={{justifyContent: 'center'}}>
										<NavItem>
										<NavLink 
											active={ activeTab === '10' }
											href='#'
											onClick={() => { setActiveTab('10')}}
										>
											Siembra, Crecimiento y Cosecha
										</NavLink>
										</NavItem>
				
										<NavItem>
										<NavLink 
											active={ activeTab === '20' }
											href='#'
											onClick={() => { setActiveTab('20')}}
										>
											Procesamiento
										</NavLink>
										</NavItem>
				
										<NavItem>
										<NavLink 
											active={ activeTab === '30' }
											href='#'
											onClick={() => { setActiveTab('30')}}
										>
											Empaque
										</NavLink>
										</NavItem>
					
										<NavItem>
										<NavLink 
											active={ activeTab === '40' }
											href='#'
											onClick={() => { setActiveTab('40')}}
										>
											Vender
										</NavLink>
										</NavItem>
				
										<NavItem>
										<NavLink 
											active={ activeTab === '50' }
											href='#'
											onClick={() => { setActiveTab('50')}}
										>
											Comprar a Agricultor
										</NavLink>
										</NavItem>
				
										<NavItem>
										<NavLink 
											active={ activeTab === '60' }
											href='#'
											onClick={() => { setActiveTab('60')}}
										>
											Envio y Recepción (Transporte)
										</NavLink>
										</NavItem>
				
										<NavItem>
										<NavLink 
											active={ activeTab === '70' }
											href='#'
											onClick={() => { setActiveTab('70')}}
										>
											Compra Consumidor 
										</NavLink>
										</NavItem>
										</Nav>
				
									</TabPane>
				
									<TabPane tabId='4'>
										<Box m={10} p={20}>
											<Container>
												<Row className="justify-content-md-center">
													<Col>
														<Card>
															<Heading>Consulta Datos</Heading>
															<Input type='text' p ={3} m={1} placeholder='Codigo Item UPC' name='upc10'/>
															<Button size='mediam' p ={3} m={1} onClick={()=> {fetchData1()}}>Consultar Detalles</Button>
															<Button size='mediam' p ={3} m={1} onClick={()=> {fetchData2()}}>Consultar Trazabilidad</Button>
							
						
						
														</Card>
													</Col>
													<Col>
														<Card>
						
														{datas.map(data => (
														<Text.p key ={data.id}>{data}</Text.p>
														))}
														
														</Card>
													</Col>
												</Row>
				
												
											</Container>
												{(() => {
						switch(trackState) {
							case '0':
							return 			<Card style={{textAlign: 'center'}}>
											
												<span class="badge badge-pill badge-success">Siembra</span>
												<span class="badge badge-pill badge-dark">Maduración</span>
												<span class="badge badge-pill badge-dark">Cosecha</span>
												<span class="badge badge-pill badge-dark">Procesamiento</span>
												<span class="badge badge-pill badge-dark">Empaque</span>
												<span class="badge badge-pill badge-dark">En venta</span>
												<span class="badge badge-pill badge-dark">Vendido</span>
												<span class="badge badge-pill badge-dark">Enviado</span>								
												<span class="badge badge-pill badge-dark">Recibido</span>
												<span class="badge badge-pill badge-dark">Registro CF</span>
											</Card>;
							case '1':
							return 			<Card style={{textAlign: 'center'}}>
											
												<span class="badge badge-pill badge-success">Siembra</span>
												<span class="badge badge-pill badge-success">Maduración</span>
												<span class="badge badge-pill badge-dark">Cosecha</span>
												<span class="badge badge-pill badge-dark">Procesamiento</span>
												<span class="badge badge-pill badge-dark">Empaque</span>
												<span class="badge badge-pill badge-dark">En venta</span>
												<span class="badge badge-pill badge-dark">Vendido</span>
												<span class="badge badge-pill badge-dark">Enviado</span>								
												<span class="badge badge-pill badge-dark">Recibido</span>
												<span class="badge badge-pill badge-dark">Registro CF</span>
				
												<span class="badge badge-pill badge-dark">Siembra</span>
											</Card>;
							case '2':
							return 			<Card style={{textAlign: 'center'}}>
											
												<span class="badge badge-pill badge-success">Siembra</span>
												<span class="badge badge-pill badge-success">Maduración</span>
												<span class="badge badge-pill badge-success">Cosecha</span>
												<span class="badge badge-pill badge-dark">Procesamiento</span>
												<span class="badge badge-pill badge-dark">Empaque</span>
												<span class="badge badge-pill badge-dark">En venta</span>
												<span class="badge badge-pill badge-dark">Vendido</span>
												<span class="badge badge-pill badge-dark">Enviado</span>								
												<span class="badge badge-pill badge-dark">Recibido</span>
												<span class="badge badge-pill badge-dark">Registro CF</span>
				
												<span class="badge badge-pill badge-dark">Siembra</span>
											</Card>;
							case '3':
							return 			<Card style={{textAlign: 'center'}}>
											
												<span class="badge badge-pill badge-success">Siembra</span>
												<span class="badge badge-pill badge-success">Maduración</span>
												<span class="badge badge-pill badge-success">Cosecha</span>
												<span class="badge badge-pill badge-success">Procesamiento</span>
												<span class="badge badge-pill badge-dark">Empaque</span>
												<span class="badge badge-pill badge-dark">En venta</span>
												<span class="badge badge-pill badge-dark">Vendido</span>
												<span class="badge badge-pill badge-dark">Enviado</span>								
												<span class="badge badge-pill badge-dark">Recibido</span>
												<span class="badge badge-pill badge-dark">Registro CF</span>
				
											</Card>;
							case '4':
							return 			<Card style={{textAlign: 'center'}}>
											
												<span class="badge badge-pill badge-success">Siembra</span>
												<span class="badge badge-pill badge-success">Maduración</span>
												<span class="badge badge-pill badge-success">Cosecha</span>
												<span class="badge badge-pill badge-success">Procesamiento</span>
												<span class="badge badge-pill badge-success">Empaque</span>
												<span class="badge badge-pill badge-dark">En venta</span>
												<span class="badge badge-pill badge-dark">Vendido</span>
												<span class="badge badge-pill badge-dark">Enviado</span>								
												<span class="badge badge-pill badge-dark">Recibido</span>
												<span class="badge badge-pill badge-dark">Registro CF</span>
				
											</Card>;
							case '5':
							return 			<Card style={{textAlign: 'center'}}>
											
												<span class="badge badge-pill badge-success">Siembra</span>
												<span class="badge badge-pill badge-success">Maduración</span>
												<span class="badge badge-pill badge-success">Cosecha</span>
												<span class="badge badge-pill badge-success">Procesamiento</span>
												<span class="badge badge-pill badge-success">Empaque</span>
												<span class="badge badge-pill badge-success">En venta</span>
												<span class="badge badge-pill badge-dark">Vendido</span>
												<span class="badge badge-pill badge-dark">Enviado</span>								
												<span class="badge badge-pill badge-dark">Recibido</span>
												<span class="badge badge-pill badge-dark">Registro CF</span>
				
				
											</Card>;
							case '6':
							return 			<Card style={{textAlign: 'center'}}>
											
												<span class="badge badge-pill badge-success">Siembra</span>
												<span class="badge badge-pill badge-success">Maduración</span>
												<span class="badge badge-pill badge-success">Cosecha</span>
												<span class="badge badge-pill badge-success">Procesamiento</span>
												<span class="badge badge-pill badge-success">Empaque</span>
												<span class="badge badge-pill badge-success">En venta</span>
												<span class="badge badge-pill badge-success">Vendido</span>
												<span class="badge badge-pill badge-dark">Enviado</span>								
												<span class="badge badge-pill badge-dark">Recibido</span>
												<span class="badge badge-pill badge-dark">Registro CF</span>
				
											</Card>;
							case '7':
							return 							<Card style={{textAlign: 'center'}}>
											
												<span class="badge badge-pill badge-success">Siembra</span>
												<span class="badge badge-pill badge-success">Maduración</span>
												<span class="badge badge-pill badge-success">Cosecha</span>
												<span class="badge badge-pill badge-success">Procesamiento</span>
												<span class="badge badge-pill badge-success">Empaque</span>
												<span class="badge badge-pill badge-success">En venta</span>
												<span class="badge badge-pill badge-success">Vendido</span>
												<span class="badge badge-pill badge-success">Enviado</span>								
												<span class="badge badge-pill badge-dark">Recibido</span>
												<span class="badge badge-pill badge-dark">Registro CF</span>
				
				
											</Card>;
							case '8':
							return 			<Card style={{textAlign: 'center'}}>
											
												<span class="badge badge-pill badge-success">Siembra</span>
												<span class="badge badge-pill badge-success">Maduración</span>
												<span class="badge badge-pill badge-success">Cosecha</span>
												<span class="badge badge-pill badge-success">Procesamiento</span>
												<span class="badge badge-pill badge-success">Empaque</span>
												<span class="badge badge-pill badge-success">En venta</span>
												<span class="badge badge-pill badge-success">Vendido</span>
												<span class="badge badge-pill badge-success">Enviado</span>								
												<span class="badge badge-pill badge-success">Recibido</span>
												<span class="badge badge-pill badge-dark">Registro CF</span>
											</Card>;
							case '9':
							return 			<Card style={{textAlign: 'center'}}>
											
												<span class="badge badge-pill badge-success">Siembra</span>
												<span class="badge badge-pill badge-success">Maduración</span>
												<span class="badge badge-pill badge-success">Cosecha</span>
												<span class="badge badge-pill badge-success">Procesamiento</span>
												<span class="badge badge-pill badge-success">Empaque</span>
												<span class="badge badge-pill badge-success">En venta</span>
												<span class="badge badge-pill badge-success">Vendido</span>
												<span class="badge badge-pill badge-success">Enviado</span>								
												<span class="badge badge-pill badge-success">Recibido</span>
												<span class="badge badge-pill badge-success">Registro CF</span>
				
				
											</Card>;												
							default:
							return 			<Card style={{textAlign: 'center'}}>
											
												<span class="badge badge-pill badge-dark">Siembra</span>
												<span class="badge badge-pill badge-dark">Maduración</span>
												<span class="badge badge-pill badge-dark">Cosecha</span>
												<span class="badge badge-pill badge-dark">Procesamiento</span>
												<span class="badge badge-pill badge-dark">Empaque</span>
												<span class="badge badge-pill badge-dark">En venta</span>
												<span class="badge badge-pill badge-dark">Vendido</span>
												<span class="badge badge-pill badge-dark">Enviado</span>								
												<span class="badge badge-pill badge-dark">Recibido</span>
				
											</Card>;
						}
												})()}
										</Box>
									</TabPane>
				
									<TabPane tabId='10'>
										<Box m={10} p={20}>
										<Container>	
											<Row className="justify-content-md-center">
												<Button p ={3} m={1} Flex  size='large' onClick={() => currentAccountRoles()}>Verificar Roles de dirección</Button>
											</Row>
											
												<Row>
													<Col >
														<Card width={'100%'} mx={'auto'} px={3} pt={20} Flex >
															<Heading>Registrar Siembra</Heading>
															<Text color='red' px={20}>Solo Agricultor </Text> 
															<Input type='number' p ={3} m={1} placeholder='Codigo Item UPC' name='upc' />
															<Input type='text' p ={3} m={1} placeholder='Nombre del Agricultor' name='farmerName' />
															<Input type='text' p ={3} m={1} placeholder='Nombre de la Finca' name='farmName'/>
															<Input type='text' p ={3} m={1} placeholder='Latitud' name='latitudFarm'/>
															<Input type='text' p ={3} m={1} placeholder='Longitud' name='longitudeFarm'/>
															<Textarea rows='2' width={[1,1,1]} p={3} m={1} placeholder='Detalles' name='detailsF' />
															<OutlineButton p ={3} m={1} onClick={() => addSiembra()}>Registrar</OutlineButton>
														</Card>
													</Col>
													<Col>
														<Card width={"100%"} mx={'auto'} px={3} pt={20} Flex >
															<Heading>Registrar Maduración </Heading>
															<Text color='red' px={20}>Solo Agricultor</Text>
															<Input type='int' p ={3} m={1} placeholder='Codigo Item UPC' name='upc1'/>
															<p/>
															<OutlineButton pt ={3} mt={1} onClick={()=> {addMaduracion()}}>Registrar </OutlineButton>
														</Card>	
													</Col>
													<Col>
														<Card width={"100%"} mx={'auto'} px={3} pt={20} Flex >
															<Heading>Registrar Cosecha </Heading>
															<Text color='red' px={20}>Solo Agricultor</Text>
															<Input type='int' p ={3} m={1} placeholder='Codigo Item UPC' name='upc2'/>
															<p/>
															<OutlineButton pt ={3} mt={1} onClick={()=> {addCosecha()}}>Registrar </OutlineButton>
														</Card>	
													</Col>
											</Row>
										</Container>
										</Box>
									</TabPane>
									<TabPane tabId='20'>
										<Box m={10} p={20}>
										<Container>
											<Row className="justify-content-md-center">
												<Button p ={3} m={1} Flex  size='large' onClick={() => currentAccountRoles()}>Verificar Roles de dirección</Button>
											</Row>
											<Row className="justify-content-md-center">
												<Col/>
												<Col>
												<Card  mx={'auto'} px={3} pt={20} Flex >
													<Heading>Registrar Procesamiento </Heading>
													<Text color='red' >Solo Agricultor</Text>
													<Input type='int'  placeholder='Codigo Item UPC' name='upc3'/>
													<p/>
													<OutlineButton pt ={3} mt={1} onClick={()=> {addProcesamiento()}}>Registrar </OutlineButton>
												</Card>	
												</Col>
												<Col/>
											</Row>
										</Container>
										</Box>
									</TabPane>
									<TabPane tabId='30'>
										<Box m={10} p={20}>
										<Container>
											<Row className="justify-content-md-center">
												<Button p ={3} m={1} Flex  size='large' onClick={() => currentAccountRoles()}>Verificar Roles de dirección</Button>
											</Row>
											<Row className="justify-content-md-center">
												<Col/>
												<Col>
													<Card  mx={'auto'} px={3} pt={20} Flex >
														<Heading>Registrar Empaque </Heading>
														<Text color='red' >Solo Agricultor</Text>
														<Input type='int'  placeholder='Codigo Item UPC' name='upc4'/>
														<p/>
														<OutlineButton pt ={3} mt={1} onClick={()=> {addEmpaque()}}>Registrar </OutlineButton>
													</Card>	
												</Col>
												<Col/>
											</Row>
											</Container>
										</Box>
									</TabPane>
									<TabPane tabId='40'>
										<Box m={10} p={20}>
											<Container>
											<Row className="justify-content-md-center">
												<Button p ={3} m={1} Flex  size='large' onClick={() => currentAccountRoles()}>Verificar Roles de dirección</Button>
											</Row>
											<Row className="justify-content-md-center">
												<Col/>
												<Col>
													<Card  mx={'auto'} px={3} pt={20} Flex >
														<Heading>Disponer Para venta </Heading>
														<Text color='red' >Solo Agricultor</Text>
														<Input type='int' placeholder='Codigo Item UPC' name='upc5'/>
														<Input type='int'  placeholder='Costo en ETH' name='ethPrice'/>
														<p/>
														<OutlineButton pt ={3} mt={1} onClick={()=> {addVenta()}}>Registrar </OutlineButton>
													</Card>	
												</Col>
												<Col/>
											</Row>
											</Container>
										</Box>
									</TabPane>
									<TabPane tabId='50'>
										<Box m={10} p={20}>
											<Container>
											<Row className="justify-content-md-center">
												<Button p ={3} m={1} Flex  size='large' onClick={() => currentAccountRoles()}>Verificar Roles de dirección</Button>
											</Row>
												<Row className="justify-content-md-center">
													<Col/>
													<Col>
														<Card mx={'auto'} px={3} pt={20} Flex >
															<Heading>Comprar Item</Heading>
															<Text color='red' >Solo Distribuidor</Text>
															<Input type='int' placeholder='Codigo Item UPC' name='upc6'/>
															<Input type='int' placeholder='Eth Price Value' name='ethPrice1'/>
															<p/>
															<OutlineButton pt ={3} mt={1} onClick={()=> {addCompra()}}>Registrar </OutlineButton>
														</Card>	
													</Col>
													<Col/>
											</Row>
											</Container>
										</Box>
									</TabPane>
									<TabPane tabId='60'>
										<Box m={10} p={20}>
											<Container>
											<Row className="justify-content-md-center">
												<Button p ={3} m={1} Flex  size='large' onClick={() => currentAccountRoles()}>Verificar Roles de dirección</Button>
											</Row>
												<Row className="justify-content-md-center">
												<Col>
												<Card  mx={'auto'} px={3} pt={20} Flex >
													<Heading>Registrar Envio</Heading>
													<Text color='red' >Solo Distribuidor</Text>
													<Input type='int' placeholder='Codigo Item UPC' name='upc7'/>
													<p/>
													<OutlineButton pt ={3} mt={1} onClick={()=> {addEnvio()}}>Registrar </OutlineButton>
												</Card>	
												</Col>
												<Col/>
												<Col>
												<Card  mx={'auto'} px={3} pt={20} Flex >
													<Heading>Registrar Recepcion</Heading>
													<Text color='red' >Solo Retailer</Text>
													<Input type='int' placeholder='Codigo Item UPC' name='upc8'/>
													<p/>
													<OutlineButton pt ={3} mt={1} onClick={()=> {addRecepcion()}}>Registrar </OutlineButton>
												</Card>	
												</Col>
											</Row>
											</Container>
										</Box>
										
									</TabPane>
				
									<TabPane tabId='70'>
										<Container>
											<Row className="justify-content-md-center">
												<Button p ={3} m={1} Flex  size='large' onClick={() => currentAccountRoles()}>Verificar Roles de dirección</Button>
											</Row>
											<Row className="justify-content-md-center">
												<Col/>
												<Col>
													<Card  mx={'auto'} px={3} pt={20} Flex >
														<Heading>Registrar Venta en Tienda </Heading>
														<Text color='red' >Solo Consumidor</Text>
														<Input type='int'placeholder='Codigo Item UPC' name='upc9'/>
														<p/>
														<OutlineButton pt ={3} mt={1} onClick={()=> {addCompraCliente()}}>Registrar </OutlineButton>
													</Card>	
												</Col>
												<Col/>
											</Row>
										</Container>
									</TabPane>
								</TabContent>
				
								<Box>
									<Card  color="green" bg="black" height={'auto'}>
										<Heading>LOGS:</Heading>
										{logs.map(logy => (
												<Text.p key ={logy.id} color='green'>{logy}</Text.p>
										))}
										<Heading color="red">ERROR:</Heading>
										<Text color="red">{errMessage}</Text>
									</Card>
								</Box>
							</div>
							)
				}
			}
	}
}

export default App;