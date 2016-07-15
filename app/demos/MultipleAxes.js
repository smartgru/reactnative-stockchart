import React, { Component } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import {
  VictoryArea,
  VictoryAxis,
  VictoryLine,
} from 'victory-chart-native';
import Svg  from 'react-native-svg';

import Text from '../components/Text';
import data from '../data';
import * as util from '../util';

const defaultHeight = 300;
const defaultWidth = Dimensions.get('window').width;

class MultipleAxes extends Component {
  render() {
    const { ticks, tradingHours, lowestPrice, highestPrice, previousClose } = data;
    return (
      <ScrollView style={styles.container}>
        <Text>let's add another y-axis to display percentage change, if you try to put more than one y-axis in a VictoryChart , it will cause an error, you have to wrap two y-axis in a Svg element from 'react-native-svg' and calculate the domain manually</Text>
        <Text>make sure you set standalone: false or it will crash</Text>
        <Text>let's begin with the very basic chart with 2 y-axes</Text>
        <Svg height={defaultHeight} width={defaultWidth}>
          <VictoryAxis
            standalone={false}
          />
          <VictoryAxis
            dependentAxis
            standalone={false}
          />
          <VictoryAxis
            dependentAxis
            orientation="right"
            standalone={false}
          />
        </Svg>

        <Text>Let's draw the price line here</Text>
        <Svg height={defaultHeight} width={defaultWidth}>
          <VictoryAxis
            standalone={false}
          />
          <VictoryAxis
            dependentAxis
            standalone={false}
          />
          <VictoryAxis
            dependentAxis
            orientation="right"
            standalone={false}
          />
          <VictoryLine
            standalone={false}
            data={ticks}
            x={(d) => new Date(d.time * 1000)}
            y={'price'}
          />
        </Svg>

        <Text>again, we have to set correct domain/scale for VictoryAxis/VictoryLine</Text>
        <Svg height={defaultHeight} width={defaultWidth}>
          <VictoryAxis
            standalone={false}
            scale="time"
            domain={tradingHours.map(t => t * 1000)}
          />
          <VictoryAxis
            dependentAxis
            standalone={false}
            domain={[lowestPrice, highestPrice]}
          />
          <VictoryAxis
            dependentAxis
            orientation="right"
            standalone={false}
            domain={[lowestPrice, highestPrice]}
          />
          <VictoryLine
            standalone={false}
            data={ticks}
            domain={{
              x: tradingHours.map(t => t * 1000)
            }}
            x={(d) => new Date(d.time * 1000)}
            y={'price'}
          />
        </Svg>

        <Text>tweak the tickFormat of the right y-axis to display percentage</Text>
        <Svg height={defaultHeight} width={defaultWidth}>
          <VictoryAxis
            standalone={false}
            scale="time"
            domain={tradingHours.map(t => t * 1000)}
          />
          <VictoryAxis
            dependentAxis
            standalone={false}
            domain={[lowestPrice, highestPrice]}
          />
          <VictoryAxis
            dependentAxis
            orientation="right"
            standalone={false}
            domain={[lowestPrice, highestPrice]}
            tickFormat={(t) => util.tickFormatPercent(t, previousClose)}
          />
          <VictoryLine
            standalone={false}
            data={ticks}
            domain={{
              x: tradingHours.map(t => t * 1000)
            }}
            x={(d) => new Date(d.time * 1000)}
            y={'price'}
          />
        </Svg>

        <Text>add previous close line/grid line back</Text>
        <Svg height={defaultHeight} width={defaultWidth}>
          <VictoryAxis
            standalone={false}
            scale="time"
            domain={tradingHours.map(t => t * 1000)}
          />
          <VictoryAxis
            dependentAxis
            standalone={false}
            domain={[lowestPrice, highestPrice]}
            style={{
              grid: {
                stroke: '#ddd',
                strokeWidth: 1
              },
              axis: { stroke: 'transparent' },
              ticks: { stroke: 'transparent' }
            }}
          />
          <VictoryAxis
            dependentAxis
            orientation="right"
            standalone={false}
            domain={[lowestPrice, highestPrice]}
            tickFormat={(t) => util.tickFormatPercent(t, previousClose)}
          />
          <VictoryLine
            standalone={false}
            data={ticks}
            domain={{
              x: tradingHours.map(t => t * 1000)
            }}
            x={(d) => new Date(d.time * 1000)}
            y={'price'}
          />
          <VictoryLine
            standalone={false}
            domain={{
              y: [lowestPrice, highestPrice]
            }}
            data={[
              { x: tradingHours[0] * 1000, y: previousClose },
              { x: tradingHours[1] * 1000, y: previousClose }
            ]}
            style={{
              data: {
                stroke: 'blue',
                strokeWidth: 0.5
              }
            }}
          />
        </Svg>

        <Text>use AxisArea</Text>
        <Svg height={defaultHeight} width={defaultWidth}>
          <VictoryAxis
            standalone={false}
            scale="time"
            domain={tradingHours.map(t => t * 1000)}
          />
          <VictoryAxis
            dependentAxis
            standalone={false}
            domain={[lowestPrice, highestPrice]}
            style={{
              grid: {
                stroke: '#ddd',
                strokeWidth: 1
              },
              axis: { stroke: 'transparent' },
              ticks: { stroke: 'transparent' }
            }}
          />
          <VictoryAxis
            dependentAxis
            orientation="right"
            standalone={false}
            domain={[lowestPrice, highestPrice]}
            tickFormat={(t) => util.tickFormatPercent(t, previousClose)}
          />
          <VictoryArea
            standalone={false}
            data={ticks}
            domain={{
              x: tradingHours.map(t => t * 1000),
              y: [lowestPrice, highestPrice]
            }}
            x={(d) => new Date(d.time * 1000)}
            y={'price'}
            style={{
              data: {
                stroke: 'rgba(0, 102, 221, 0.75)',
                fill: 'rgba(237, 247, 255, 0.75)',
              }
            }}
          />
          <VictoryLine
            standalone={false}
            domain={{
              y: [lowestPrice, highestPrice]
            }}
            data={[
              { x: tradingHours[0] * 1000, y: previousClose },
              { x: tradingHours[1] * 1000, y: previousClose }
            ]}
            style={{
              data: {
                stroke: 'blue',
                strokeWidth: 0.5
              }
            }}
          />
        </Svg>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

export default MultipleAxes;
