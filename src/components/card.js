import React, {Component} from 'react';
import {Avatar, Card, Title, Cover, Paragraph} from 'react-native-paper';
import {StyleSheet} from 'react-native';

class CardComponent extends Component {
  render() {
    const {
      title,
      subtitle,
      description,
      clickCard,
      childStyle,
      icon,
    } = this.props;

    return (
      <Card style={[styles.container, childStyle]} onPress={clickCard}>
        <Card.Title
          title={title}
          subtitle={subtitle}
          left={(props) => icon && <Avatar.Icon {...props} icon={icon} />}
        />
        {this.props.image && (
          <Card.Cover source={require('../../assets/organization.jpg')} />
        )}
        {description && (
          <Card.Content>
            <Paragraph>{description}</Paragraph>
          </Card.Content>
        )}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 20,
  },
});

export default CardComponent;
