//This JS file acts as a tag to create a figure of a man
// Import required tags or modules
import React from "react"
import {StyleSheet,View} from "react-native"
import {Svg,Ellipse,Line,Rect,G} from "react-native-svg"
import {createAnimatableComponent} from "react-native-animatable"

const AnimatableLine = createAnimatableComponent(Line)// This creates a animatable line
const AnimatableRect = createAnimatableComponent(Rect)// This creates a animatable rectangle
const AnimatedEllipse = createAnimatableComponent(Ellipse)// This creates a animatable ellipse

export default function Manfigure({wrongwords}){
    const topline = <AnimatableRect animation={'fadeIn'} fill={"#fff"} width="250" height="10" x="5" y="15" /* This depicts the top line */  />
    const leftline = <AnimatableRect animation={'fadeIn'} fill={"#fff"} width="10" height="450" x="20" y="0" /* This depicts the line on the left side */ />
    const bottomstand = <AnimatableRect animation={'fadeIn'} fill={"#fff"} width="250" height="20" x="0" y="450" /* This depicts the bottom stand */ />
    const rope = <AnimatableLine animation={'fadeIn'} x1="200" y1="20" x2="200" y2="110" stroke={"#fff"} strokeWidth="8" /* This depicts the rope */ />
    const face = <AnimatedEllipse animation={'fadeIn'} cx="200" cy="150" rx="40" ry="38" stroke={"#fff"} strokeWidth="6" /* This depicts the face *//>
    const firsthalf = <AnimatableRect animation={'fadeIn'} width="10" height="60" x="195" y="185" fill={"#fff"} /* This depicts the first half of the body *//>
    const secondhalf = <AnimatableRect animation={'fadeIn'} width="10" height="90" x="195" y="245" fill={"#fff"} /* This depicts the second half of the body *//>
    const hands = <AnimatableLine animation={'fadeIn'} x1="260" y1="250" x2="140" y2="250" stroke={"#fff"} stroke-Linecap="round" strokeWidth="10" /* This depicts the hands */ />
    const legs = <G /* This section depicts the legs */>
                    <AnimatableLine animation={'fadeIn'} x1="200" y1="330" x2="150" y2="380" stroke={"#fff"} stroke-Linecap="round" strokeWidth="10" />
                    <AnimatableLine animation={'fadeIn'} x1="200" y1="330" x2="250" y2="380" stroke={"#fff"} stroke-Linecap="round" strokeWidth="10" />
                </G>
    return(
        <View style={styles.container}>
            <Svg version="1.1" viewBox="0 0 300 500" preserveAspectRatio="xMinYMin meet" class="svg-content" width="140" height="200" /* This svg tag consists the figure of the man */>
                {wrongwords > 0 ? topline : null}
                {wrongwords > 0 ? leftline : null}
                {wrongwords > 0 ? bottomstand : null}
                {wrongwords > 1 ? rope : null}
                {wrongwords > 2 ? face : null}
                {wrongwords > 3 ? firsthalf : null}
                {wrongwords > 4 ? hands : null}
                {wrongwords > 5 ? secondhalf : null }
                {wrongwords > 6 ? legs : null}
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})