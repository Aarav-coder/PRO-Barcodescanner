import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state={
      hascamerapermissions:null,
      scanned:false,
      scannedData:'',
      buttonState:'normal'
    }
  }
  getcamerapermissions=async()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hascamerapermissions:status === "granted",
      buttonState:'clicked'
    })
  }
  handlebarcodescanned=async(type,data)=>{
    this.setState({
      scanned:true,
      scannedData:data,
      buttonState:'normal'
    })
  }
  render(){
    const hascamerapermissions=this.state.hascamerapermissions;
    const scanned=this.state.scanned;
    const buttonState=this.state.buttonState;
    if(buttonState==='clicked' && hascamerapermissions){
    return(
     <BarCodeScanner
     onBarCodeScanned={scanned?undefined:this.handlebarcodescanned}
     style={StyleSheet.absoluteFillObject}
     >

     </BarCodeScanner>
    )
    }
    else if(buttonState==='normal'){
  return (
    <View style={styles.container}>
      <Text>{hascamerapermissions===true? this.state.scannedData:'request camera permission'}</Text>
      <TouchableOpacity style={{backgroundColor:'blue',padding:10,margin:10,width:200,height:50,}}
      onPress={this.getcamerapermissions}
      >
<Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>
  Scan QR code
</Text>
      </TouchableOpacity>
    </View>
  );
}
}
}
const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});