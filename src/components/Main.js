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
    for (let i=0; i < durations.length / 3; i++) {
        if (durations[i] > 1.2) {
            return false;
        }
    }
    return true;
}

function downStreak(durations) {
    for (let i=0; i < durations.length / 4; i++) {
        if (durations[i] < 2) {
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
        } else if (downStreak(durations)) {
            currently = "down";
        } else {
            let [fastRatio, slowRatio, downRatio] = ratios(durations);
            if (fastRatio > 0.85) {
                currently = "up";
            } else {
                currently = "down";
            }
        }

        let mainClass = "background-" + currently;
        let imgSrc = "/img/" + currently + ".png";

        return (
            <div className={mainClass}>
                <div className="status-img row middle-xs center-xs">
                    <div className="col-xs-12">
                        <img src={imgSrc} />
                    </div>
                </div>
                <div className="status-text row middle-xs center-xs">
                    <div className="col-xs-12">
                        <span>Pokémon GO is {currently}.</span>
                    </div>
                </div>
                <div className="status-date row middle-xs center-xs">
                    <div className="col-xs-12">
                        <Time value={status.lastChecked} format="MMM DD, h:mm a" />
                    </div>
                </div>
                <div className="row middle-xs center-xs status-refresh">
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
