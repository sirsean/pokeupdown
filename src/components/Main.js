import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import {connect} from "react-redux";

const Loading = React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }
});

const DurationCell = React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
        let d = this.props.duration;
        let classes = ["duration-cell", "col-xs"];
        if (d < 0.8) {
            classes.push("fast");
        } else if (d < 3) {
            classes.push("slow");
        } else {
            classes.push("down");
        }
        return (
            <div className={classes.join(" ")}></div>
        );
    }
});

const Status = React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
        let status = this.props.status;
        if (status == null) {
            return (
                <div></div>
            );
        }
        let durations = status.durations;
        durations.reverse();

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
        return (
            <div>
                <div className="durations row">
                    {durations.map(function(d, i) {
                        return <DurationCell key={i} duration={d} />;
                    })}
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
