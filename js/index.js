'use strict';

var LeaderBoard = React.createClass({
  displayName: 'LeaderBoard',

  getInitialState: function getInitialState() {
    return {
      recent: [],
      alltime: [],
      display: 'recent'
    };
  },

  componentDidMount: function componentDidMount() {
    $.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent', function (data) {
      this.setState({
        recent: data
      });
    }.bind(this));

    $.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime', function (data) {
      this.setState({
        alltime: data
      });
    }.bind(this));
  },

  showRecent: function showRecent() {
    this.setState({
      display: 'recent'
    });
  },

  showAllTime: function showAllTime() {
    this.setState({
      display: 'alltime'
    });
  },

  render: function render() {
    return React.createElement(
      'table',
      { className: 'table table-striped table-bordered table-hover table-condensed' },
      React.createElement(
        'thead',
        null,
        React.createElement(
          'tr',
          null,
          React.createElement(
            'th',
            { colSpan: '4', className: ' borwn title' },
            React.createElement(
              'h2',
              null,
              'Leaderboard'
            )
          )
        ),
        React.createElement(
          'tr',
          null,
          React.createElement(
            'th',
            { className: 'title' },
            React.createElement(
              'h4',
              null,
              '#'
            )
          ),
          React.createElement(
            'th',
            { className: 'title' },
            React.createElement(
              'h4',
              null,
              'Camper Name'
            )
          ),
          React.createElement(
            'th',
            { className: 'title' },
            React.createElement(
              'a',
              { onClick: this.showRecent },
              React.createElement(
                'h4',
                null,
                'Points in Past 30 Days',
                React.createElement('span', {
                  className: ['glyphicon', this.state.display === 'recent' ? 'glyphicon-chevron-down' : ''].join(' ') })
              )
            )
          ),
          React.createElement(
            'th',
            { className: 'title' },
            React.createElement(
              'a',
              { onClick: this.showAllTime },
              React.createElement(
                'h4',
                null,
                'All Time Points',
                React.createElement('span', {
                  className: ['glyphicon', this.state.display === 'alltime' ? 'glyphicon-chevron-down' : ''].join(' ') })
              )
            )
          )
        )
      ),
      React.createElement(TableRows, { data: this.state[this.state.display] })
    );
  }
});

var Row = React.createClass({
  displayName: 'Row',

  render: function render() {
    return React.createElement(
      'tr',
      null,
      React.createElement(
        'td',
        { className: 'data' },
        this.props.id
      ),
      React.createElement(
        'td',
        null,
        React.createElement(
          'a',
          { target: '_blank', href: "https://freecodecamp.com/" + this.props.data.username },
          React.createElement('img', { className: 'photo', src: this.props.data.img }),
          '  ',
          this.props.data.username
        )
      ),
      React.createElement(
        'td',
        { className: 'data' },
        this.props.data.recent
      ),
      React.createElement(
        'td',
        { className: 'data' },
        this.props.data.alltime
      )
    );
  }
});

var TableRows = React.createClass({
  displayName: 'TableRows',

  render: function render() {
    var rows = this.props.data.map(function (row, index) {
      return React.createElement(Row, { key: index, id: index + 1, data: row });
    });

    return React.createElement(
      'tbody',
      null,
      rows
    );
  }
});
ReactDOM.render(React.createElement(LeaderBoard, null), document.getElementById('content'));
