import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import {connect} from "react-redux";
import Time from "react-time";
var Actions = require("../actions/Actions.js");

function ratios(durations) {
    let numFast = 0;
    let numSlow = 0;
    let numDown = 0;
    durations.forEach(function(d) {
        if (d < 0.8) {
            numFast++;
        } else if (d < 3) {
            numSlow++;
        } else {
            numDown++;
        }
    });
    let numDurations = durations.length;
    let fastRatio = numFast / numDurations;
    let slowRatio = numSlow / numDurations;
    let downRatio = numDown / numDurations;

    return [
        numFast / numDurations,
        numSlow / numDurations,
        numDown / numDurations
    ];
}

function upStreak(durations) {
    for (let i=0; i < durations.length / 2; i++) {
        if (durations[i] > 1.2) {
            return false;
        }
    }
    return true;
}

const Status = React.createClass({
    mixins: [PureRenderMixin],
    onClickRefresh: function() {
        Actions.loadStatus();
    },
    render: function() {
        let status = this.props.status;
        if ((status == null) || (!status.durations.length)) {
            return (
                <div></div>
            );
        }
        let durations = status.durations;

        let currently = null;

        if (upStreak(durations)) {
            currently = "up";
        } else {
            let [fastRatio, slowRatio, downRatio] = ratios(durations);
            if (fastRatio > 0.75) {
                currently = "up";
            } else if (downRatio > 0.4) {
                currently = "down";
            } else {
                currently = "slow";
            }
        }

        let thumbClasses = ["thumb", "fa", "fa-6", currently];
        if (currently == "up") {
            thumbClasses.push("fa-thumbs-up");
        } else if (currently == "slow") {
            thumbClasses.push("fa-thumbs-up");
        } else if (currently == "down") {
            thumbClasses.push("fa-thumbs-down");
        }

        let lastChecked = status.lastChecked.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit"
        });

        return (
            <div>
                <div className="row middle-xs center-xs">
                    <div className="col-xs-12">
                        <i className={thumbClasses.join(" ")}></i>
                    </div>
                </div>
                <div className="row middle-xs center-xs">
                    <div className="col-xs-12">
                        <span>Pokémon Go is currently</span>
                    </div>
                </div>
                <div className="status-line row middle-xs center-xs">
                    <div className="col-xs-12">
                        <span>{currently}</span>
                    </div>
                </div>
                <div className="row middle-xs center-xs">
                    <div className="col-xs-12">
                        <span>as of <Time value={status.lastChecked} format="MMM DD, h:mm a" /></span>
                    </div>
                </div>
                <div className="row middle-xs center-xs">
                    <div className="col-xs-12">
                        <button onClick={this.onClickRefresh}><i className="fa fa-refresh"></i></button>
                    </div>
                </div>
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        loading: state.status.loading,
        status: state.status.status
    };
}

const PureMain = React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
        return (
            <div className="main">
                {<Status status={this.props.status} />}
            </div>
        );
    }
});

export const Main = connect(mapStateToProps)(PureMain);
