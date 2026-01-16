import * as React from "react"
import { cn } from "@/lib/utils"

// Switch component
const Switch = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    role="switch"
    className={cn(
      "inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      props.checked ? "bg-emerald-600" : "bg-slate-300",
      className
    )}
    aria-checked={props.checked}
    {...props}
  >
    <span
      className={cn(
        "inline-block h-5 w-5 rounded-full bg-white transition-transform",
        props.checked ? "translate-x-5" : "translate-x-0.5"
      )}
    />
  </button>
))
Switch.displayName = "Switch"

// Slider component
const Slider = React.forwardRef(({ className, value = 50, onChange, min = 0, max = 100, ...props }, ref) => (
  <input
    ref={ref}
    type="range"
    min={min}
    max={max}
    value={value}
    onChange={(e) => onChange?.(Number(e.target.value))}
    className={cn(
      "w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600",
      className
    )}
    {...props}
  />
))
Slider.displayName = "Slider"

// Dialog components
const DialogContext = React.createContext()

const Dialog = ({ open, onOpenChange, children }) => (
  <DialogContext.Provider value={{ open, onOpenChange }}>
    {children}
    {open && (
      <div className="fixed inset-0 z-50 bg-black/50" onClick={() => onOpenChange?.(false)} />
    )}
  </DialogContext.Provider>
)

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const { open, onOpenChange } = React.useContext(DialogContext)

  if (!open) return null

  return (
    <div
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-lg border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-950",
        className
      )}
      {...props}
    >
      {children}
      <button
        onClick={() => onOpenChange?.(false)}
        className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
      >
        ✕
      </button>
    </div>
  )
})
DialogContent.displayName = "DialogContent"

const DialogHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 text-left", className)} {...props} />
)

const DialogTitle = ({ className, ...props }) => (
  <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
)

const DialogDescription = ({ className, ...props }) => (
  <p className={cn("text-sm text-slate-500 dark:text-slate-400", className)} {...props} />
)

// Popover components
const Popover = ({ open, onOpenChange, children }) => {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const [position, setPosition] = React.useState({ top: 0, left: 0 })
  const triggerRef = React.useRef(null)

  React.useEffect(() => {
    if ((open ?? internalOpen) && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      })
    }
  }, [open, internalOpen])

  return (
    <div>
      {React.Children.map(children, (child) => {
        if (child.type === PopoverTrigger) {
          return React.cloneElement(child, {
            ref: triggerRef,
            onClick: () => {
              const newState = !(open ?? internalOpen)
              onOpenChange?.(newState)
              setInternalOpen(newState)
            },
          })
        }
        if (child.type === PopoverContent && (open ?? internalOpen)) {
          return React.cloneElement(child, { style: { position: 'absolute', ...position } })
        }
        return child
      })}
    </div>
  )
}

const PopoverTrigger = React.forwardRef((props, ref) => <div ref={ref} {...props} />)
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-50 rounded-md border border-slate-200 bg-white p-4 shadow-md dark:border-slate-800 dark:bg-slate-950",
      className
    )}
    {...props}
  />
))
PopoverContent.displayName = "PopoverContent"

// RadioGroup components
const RadioGroup = React.forwardRef(({ className, value, onValueChange, children, ...props }, ref) => (
  <div ref={ref} role="radiogroup" className={cn("space-y-2", className)} {...props}>
    {React.Children.map(children, (child) =>
      React.cloneElement(child, { checked: child.props.value === value, onChange: () => onValueChange?.(child.props.value) })
    )}
  </div>
))
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef(({ value, checked, onChange, label, ...props }, ref) => (
  <label className="flex items-center gap-2 cursor-pointer">
    <input
      ref={ref}
      type="radio"
      value={value}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 accent-emerald-600 cursor-pointer"
      {...props}
    />
    <span>{label}</span>
  </label>
))
RadioGroupItem.displayName = "RadioGroupItem"

// Select component
const Select = ({ value, onValueChange, children }) => (
  <div>
    {React.Children.map(children, (child) =>
      React.cloneElement(child, { value, onValueChange })
    )}
  </div>
)

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-base placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950",
      className
    )}
    {...props}
  >
    {children}
    <span>▼</span>
  </button>
))
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = ({ placeholder = "Selecione..." }) => <span>{placeholder}</span>

const SelectContent = ({ className, children, ...props }) => (
  <div className={cn("absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-300 bg-white shadow-md dark:border-slate-700 dark:bg-slate-950", className)} {...props}>
    {children}
  </div>
)

const SelectItem = ({ value, label }) => (
  <option value={value}>{label}</option>
)

// Tabs component
const Tabs = ({ defaultValue, children }) => {
  const [value, setValue] = React.useState(defaultValue)

  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { value, setValue })
      )}
    </div>
  )
}

const TabsList = ({ className, children, value, setValue }) => (
  <div className={cn("inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 dark:bg-slate-800", className)}>
    {React.Children.map(children, (child) =>
      React.cloneElement(child, { value, setValue })
    )}
  </div>
)

const TabsTrigger = ({ value, children, setValue, className }) => (
  <button
    onClick={() => setValue(value)}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950",
      "hover:bg-slate-200 dark:hover:bg-slate-700",
      className
    )}
  >
    {children}
  </button>
)

const TabsContent = ({ value, children, className }) => (
  <div className={cn("mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:ring-offset-slate-950", className)}>
    {children}
  </div>
)

export {
  Switch,
  Slider,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Popover,
  PopoverTrigger,
  PopoverContent,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
}
