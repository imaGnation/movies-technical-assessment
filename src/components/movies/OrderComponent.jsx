import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import React, { Component } from 'react';
import Select from 'react-select';

export class OrderComponent extends Component {
    render() {

        // Load select options
        const loadOptions = (options) => {
            let derivedOptions = [];

            if (options !== undefined)
                options.forEach(option => {
                    derivedOptions.push({ label: option.label, value: option.valueToOrderBy });
                });
            return derivedOptions;
        }

        return (
            <div>
                <InputLabel>
                    {this.props.placeholder}
                </InputLabel>
                <FormControl fullWidth>
                    <Select
                        value={this.props.value}
                        onChange={(event) => this.props.handleChange(event)}
                        options={loadOptions(this.props.items)}
                        isClearable={true}
                        isSearchable={true}
                        id={this.props.type}
                        native            
                    />
                </FormControl>
            </div>
        );
    }
}

export default OrderComponent;