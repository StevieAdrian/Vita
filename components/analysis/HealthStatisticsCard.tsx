import { View, Text, Image } from "react-native"; 
import { styles } from "@/styles/analysis/analysis.styles"; 
import { HealthStatisticsProps } from "@/types/analysis"; 

export default function HealthStatisticsCard(props: HealthStatisticsProps) { 
	return ( 
		<View style={styles.statsCard}> 
			<View style={styles.statsHeader}> 
				<Image source={require("@/assets/analysis/statistics-icon.png")} style={styles.statsIcon} /> 
				<Text style={styles.statsTitle}>Health Statistics</Text> 
			</View> 
      <View style={styles.statsSummary}>
        <View style={styles.statsBox}> 
          <Text style={styles.statsBoxValue}>{props.average}%</Text> 
          <Text style={styles.statsBoxLabel}>Health Average</Text> 
          <Text style={styles.statsBoxLabel}>In {props.trackingDays} Days</Text>
        </View> 
        <View style={styles.statsBox}> 
          <Text style={styles.statsBoxValue}>{props.trackingDays}</Text> 
          <Text style={styles.statsBoxLabel}>Tracking Days</Text> 
          <Text style={styles.statsBoxLabel}>Tracking Month</Text> 
        </View> 
      </View> 
    </View> 
	); 
}