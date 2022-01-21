import clsx from "clsx"
import React, { useEffect, useMemo, useState } from "react"
import { currencies } from "../../../utils/currencies"
import Input from "../input"
import Select from "../select"

type CurrencyInputProps = {
  options?: string[]
  currentCurrency?: string
  required?: boolean
  onCurrencyChange?: (currency) => void
} & React.InputHTMLAttributes<HTMLInputElement>

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  options,
  currentCurrency,
  required = false,
  onCurrencyChange,
  className,
  name,
  ...props
}) => {
  const isSelectable = options ? true : false

  console.log(currentCurrency, options)

  const opts = useMemo(() => {
    const codes = options
      ? options.map((o) => o.toLowerCase())
      : [currentCurrency?.toLowerCase()]
    return (
      Object.entries(currencies)
        .filter(([_key, obj]) => codes.includes(obj.code.toLowerCase()))
        .map(({ "1": { code, symbol_native, emoji } }) => ({
          value: code.toLowerCase(),
          label: emoji
            ? `${emoji} ${code.toUpperCase()}`
            : `${code.toUpperCase()}`,
          symbol: symbol_native,
        }))
        .filter(Boolean) || []
    )
  }, [options, currencies, currentCurrency])

  const [selected, setSelected] = useState(
    opts.find(({ value }) => value === currentCurrency)
  )

  useEffect(() => {
    if (onCurrencyChange) {
      onCurrencyChange(selected)
    }
  }, [selected])

  return isSelectable ? (
    <Select
      enableSearch
      label="Currency"
      options={opts}
      value={selected}
      onChange={setSelected}
      className={className}
      required={required}
      name={name}
      {...props}
    />
  ) : (
    <Input
      label="Currency"
      readOnly
      className={clsx("pointer-events-none", className)}
      value={undefined}
      placeholder={`${selected?.label}`}
      tabIndex={-1}
    />
  )
}

export default CurrencyInput