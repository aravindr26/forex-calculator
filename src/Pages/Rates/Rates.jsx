import { useState, useEffect, useRef, useMemo } from 'react';
import DropDown from '../../Components/DropDown';
import ProgressBar from '../../Components/ProgressBar';
import Loader from '../../Components/Loader';
import InputField from '../../Components/InputField';
import ErrorMessage from '../../Components/ErrorMessage';
import { useAnimationFrame } from '../../Hooks/useAnimationFrame';
import { ReactComponent as Transfer } from '../../Icons/Transfer.svg';
import classes from './Rates.module.css';
import CountryData from '../../Libs/Countries.json';
import countryToCurrency from '../../Libs/CountryCurrency.json';
import { calculateForexRate } from '../../Helpers/forexCalculationHelper';
import useForexRates from '../../Hooks/useForexRates';
let countries = CountryData.CountryCodes;

const Rates = () => {
    const [fromCurrency, setFromCurrency] = useState('AU');
    const [toCurrency, setToCurrency] = useState('US');
    const [progression, setProgression] = useState(0);
    const [sendingAmount, setSendingAmount] = useState(0);
    const { exchangeRate, loading, error, fetchData } = useForexRates(fromCurrency, toCurrency);
    /**
     * Memoize the calculation of currency conversion
     * * */
    const { amountWithoutMarkup, receivingAmount } = useMemo(() => {
        return calculateForexRate(sendingAmount, exchangeRate)
    }, [sendingAmount, exchangeRate])

    // Refs for the dropdowns
    const fromCurrencyRef = useRef(null);
    const toCurrencyRef = useRef(null);

    /**
     * Handles clicks outside the dropdowns
     * 
     * @param {Event} e - Click event.
     * * */
    const handleClickOutsideDropdown = (e) => {
        if (!fromCurrencyRef?.current.container.contains(e.target)) {
            fromCurrencyRef.current.closeDropdown();
        }

        if (!toCurrencyRef?.current.container.contains(e.target)) {
            toCurrencyRef.current.closeDropdown();
        }
    }

    // Add or remove event listener for click outside dropdowns
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideDropdown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideDropdown);
        }
    }, []);

    const Flag = ({ code }) => (
        <img alt={code || ''} src={`/img/flags/${code || ''}.svg`} width="20px" className={classes.flag} />
    );

    // Demo progress bar moving :)
    useAnimationFrame(!loading, (deltaTime) => {
        setProgression((prevState) => {
            if (prevState > 0.998) {
                if (!loading) {
                    fetchData();
                }
                return 0;
            }
            return (prevState + deltaTime * 0.0001) % 1;
        });
    });


    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.heading}>Currency Conversion</div>
                {error && <ErrorMessage message="Something went wrong, please try later." />}
                <div className={classes.rowWrapper}>
                    <div>
                        <DropDown
                            leftIcon={<Flag code={fromCurrency} />}
                            label={'From'}
                            selected={countryToCurrency[fromCurrency]}
                            options={countries.map(({ code }) => ({
                                option: countryToCurrency[code],
                                key: code,
                                icon: <Flag code={code} />,
                            }))}
                            setSelected={(key) => {
                                setFromCurrency(key);
                            }}
                            style={{ marginRight: '20px' }}
                            ref={fromCurrencyRef}
                        />
                    </div>

                    <div className={classes.exchangeWrapper}>
                        <div className={classes.transferIcon}>
                            <Transfer height={'25px'} />
                        </div>

                        <div className={classes.rate}>{exchangeRate}</div>
                    </div>

                    <div>
                        <DropDown
                            leftIcon={<Flag code={toCurrency} />}
                            label={'To'}
                            selected={countryToCurrency[toCurrency]}
                            options={countries.map(({ code }) => ({
                                option: countryToCurrency[code],
                                key: code,
                                icon: <Flag code={code} />,
                            }))}
                            setSelected={(key) => {
                                setToCurrency(key);
                            }}
                            style={{ marginLeft: '20px' }}
                            ref={toCurrencyRef}
                        />
                    </div>
                </div>

                <div className={classes.inputWrapper}>
                    <div>
                        <InputField
                            id="send-amount"
                            label='Send amount'
                            isDisabled={false}
                            setInputText={(amount) => setSendingAmount(amount)}
                            setFocus={true}
                        />
                    </div>
                    <div>
                        <InputField
                            id="receiving-amount"
                            label='Receiving amount'
                            value={Number(receivingAmount)}
                            subTextLabel='Amount without markup'
                            subTextValue={Number(amountWithoutMarkup)}
                            isDisabled={true}
                        />
                    </div>
                </div>

                <ProgressBar
                    progress={progression}
                    animationClass={loading ? classes.slow : ''}
                    style={{ marginTop: '20px' }}
                />

                {loading && (
                    <div className={classes.loaderWrapper}>
                        <Loader width={'25px'} height={'25px'} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Rates;
