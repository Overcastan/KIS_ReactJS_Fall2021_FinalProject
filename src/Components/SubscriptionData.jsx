import React from "react";

export class SubscriptionData extends React.Component {
    render() {
        const date = this.props.date;
        const isClicked = this.props.isClicked;

        return (
            isClicked &&
            <div>
                <p>Вы успешно записались на {date}</p>
            </div>
        )
    }
}