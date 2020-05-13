/**
 * @file
 * Autosuggest search component
 */

import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import classNames from 'classnames';
import './styles.scss';

const Icon = ({ iconName, iconColorHex, width, height }) => (
  <i
    className="g-icon"
    style={{
      backgroundImage: `url('https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:${iconName}?source=o-icons&tint=%23${iconColorHex},%23${iconColorHex}&format=svg')`,
      width,
      height,
    }}
  />
);

// Default get suggestions method
const defaultGetSuggestions = (value, searchList) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  // Match from the beginning of the string
  return inputLength === 0
    ? []
    : searchList.filter(({ display }) => {
        const words = display.toLowerCase().split(' ');
        return words.some(word => word.toLowerCase().slice(0, inputLength) === inputValue);
      });
};

// Default component/function to render suggestion
const RenderSuggestion = ({ display, disabled }) => (
  <div className={classNames('suggestion', disabled && 'suggestion--disabled')}>{display}</div>
);

// Default mapping from suggestion to value
const defaultGetSuggestionValue = ({ display }) => display;

const SelectedValue = ({ className, display, value, onSelectedValueRemove }) => (
  <div className={`${className}__selected-value`}>
    <span>{display}</span>
    <button
      className={`${className}__selected-value-close-button`}
      type="button"
      onClick={() => onSelectedValueRemove(value)}
    >
      <Icon iconName="cross" iconColorHex="ffffff" width={20} height={20} />
    </button>
  </div>
);

const AutosuggestSearch = ({
  className,
  placeholder,
  width,
  searchList,
  getSuggestions,
  getSuggestionValue,
  renderSuggestion,
  onSelectCallback,
  onSubmitCallback,
  onClearFunction,
  validateInput,
  defaultValue,
  errorMessageOverride,
  showSearchIcon,
  selectedValues,
  onSelectedValueRemove,
  selectedValueComponent: customSelectedValueComponent,
  showClearButton,
}) => {
  const inputRef = useRef();
  const [searchValue, setSearchValue] = useState(defaultValue || '');
  const [suggestions, setSuggestions] = useState([]);
  const [errorState, setErrorState] = useState({ isError: false, errorMessage: '' });

  const selectedValueComponent = customSelectedValueComponent || SelectedValue;

  useEffect(() => {
    if (errorMessageOverride) setErrorState({ isError: true, errorMessage: errorMessageOverride });
  }, [errorMessageOverride]);

  // Update suggestions based on search value
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value, searchList));
  };

  // Clear suggestions
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Run callback when suggestion selected from dropdown
  const onSuggestionSelected = (event, { suggestionValue, suggestion }) => {
    if (onSelectCallback) {
      const callbackReturn = onSelectCallback(suggestion);
      if (callbackReturn) setErrorState(callbackReturn);
    }
    setSearchValue(suggestionValue);
    inputRef.current.input.blur();
  };

  // Run callback on submit (ENTER)
  const onSubmit = async event => {
    event.preventDefault();
    const validateInputResult = validateInput(searchValue);
    if (validateInput && validateInputResult.isError) setErrorState(validateInputResult);
    if (onSubmitCallback && !validateInputResult.isError) {
      const callbackReturn = await onSubmitCallback(searchValue);
      if (callbackReturn) setErrorState(callbackReturn);
    }
    inputRef.current.input.blur();
  };

  // Update search value state on input change
  const onChange = event => {
    const {
      target: { value },
    } = event;
    setSearchValue(value);
    setErrorState({ isError: false, errorMessage: '' });
  };

  // Function to focus on input wherever you click
  const focusOnInput = () => inputRef.current.input.focus();

  // Clear search value on button click
  const clearSearch = () => {
    setSearchValue('');
    setErrorState({ isError: false, errorMessage: '' });
    focusOnInput();
    onClearFunction();
  };

  const { isError, errorMessage } = errorState;
  // Generate form classes
  const classes = classNames(className, isError && `${className}--error`);

  return (
    <form onSubmit={onSubmit} style={{ width }} onClick={focusOnInput}>
      <div className={classes}>
        {showSearchIcon && (
          <div className={`${className}__search-icon`}>
            <Icon iconName="search" iconColorHex="66605C" width={30} height={30} />
          </div>
        )}
        {selectedValues.length > 1 &&
          selectedValues.map(({ display, value }) =>
            selectedValueComponent({ className, display, value, onSelectedValueRemove }),
          )}
        <Autosuggest
          ref={inputRef}
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          onSuggestionSelected={onSuggestionSelected}
          focusInputOnSuggestionClick={false}
          inputProps={{
            placeholder,
            value: searchValue,
            onChange,
          }}
        />
        {showClearButton && searchValue !== '' && (
          <button className={`${className}__clear-button`} type="button" onClick={clearSearch}>
            <Icon iconName="cross" iconColorHex="33302e" width={20} height={20} />
          </button>
        )}
      </div>
      {isError && <div className={`${className}__error-message`}>{errorMessage}</div>}
    </form>
  );
};

AutosuggestSearch.displayName = 'GAutosuggestSearch';

AutosuggestSearch.propTypes = {
  className: PropTypes.string,
  searchList: PropTypes.arrayOf(PropTypes.object).isRequired,
  placeholder: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  getSuggestions: PropTypes.func,
  getSuggestionValue: PropTypes.func,
  renderSuggestion: PropTypes.func,
  onSelectCallback: PropTypes.func,
  onSubmitCallback: PropTypes.func,
  onClearFunction: PropTypes.func,
  validateInput: PropTypes.func,
  defaultValue: PropTypes.string,
  errorMessageOverride: PropTypes.string,
  showSearchIcon: PropTypes.bool,
  selectedValues: PropTypes.array,
  selectedValueComponent: PropTypes.func,
  onSelectedValueRemove: PropTypes.func,
  showClearButton: PropTypes.bool,
};

AutosuggestSearch.defaultProps = {
  className: 'g-autosuggest-search',
  placeholder: '',
  width: '100%',
  getSuggestions: defaultGetSuggestions,
  getSuggestionValue: defaultGetSuggestionValue,
  renderSuggestion: RenderSuggestion,
  onSelectCallback: () => {},
  onSubmitCallback: () => {},
  onClearCallback: () => {},
  validateInput: () => {},
  showSearchIcon: true,
  selectedValues: [],
  onSelectedValueRemove: () => {},
  showClearButton: true,
};

export default AutosuggestSearch;
