import React from "react";

export default function withDataFetching(WrappedComponent) {
    class WithDataFetching extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: [],
                loading: true,
                error: ''
            }
        }

        async componentDidMount() {
            try {
                const data = await fetch(this.props.dataSource)
                const dataJson = await data.json()
                if (dataJson) {
                    this.setState({
                        data: dataJson,
                        loading: false
                    })
                }
            } catch (error) {
                this.setState({
                    loading: false,
                    error: error.message
                })
            }
        }

        render() {
            const {data, loading, error} = this.state

            return (
                <WrappedComponent data={data} loading={loading} error={error} {...this.props} />
            )
        }
    }

    WithDataFetching.displayName = `WithDataFetching(${WrappedComponent.name})`
    return WithDataFetching;
}
