primer 참고 설계

1. Input ( LabelInput )
   FormControl,textInput 참고

# textInput props

arial-label
autoComplete
block
contrast
size : 'small' | 'medium' | 'large'
loading
loaderPosition : 'auto' | 'leading' | 'trailing'
loaderText
leadingVisual : string | React.ComponentType
monospace : boolean
tailingVisual : string | React.ComponenetType
trailingAction : React ReactElement<HTMLProps<HTMLButtonElement>>
validationStatus : error|success

# text props

as ,size, weight, whiteSpace

-> 일단 아래부터
label (+ requried) , input (+ icon), validation, caption
하고 formControl 을 추가하는 방향으로

2. Button

# Button props

alignContent : 'start' | 'center'
as : React.ElementType
href :
block : boolean
children(required) : React.ReactNode
count : number
inactive : boolean
leadingVisual : React.ElementType
loading :

-> disabled 가 있을 경우 style을 변경해줘야할듯. -> 어떤 방식으로 할지 생각할 필요가 있을듯.

3. Table

# Datatable props

aria-describedby : string
aria-labelledby : string
data : Array<Data>
column : Array<Column<Data>>
cellPadding : 'cendensed' | 'normal' | 'spacious'
aria-describedby : string
aria-labelledby : string
initialSortColumn : string | number
initialSortDirection : 'asd' | 'desc'
onToggleSort : (columnId: ObjectPaths<Data>
| string | number, direction: 'ASC' | 'DESC') => void

# Table props

aria-describedby : string
aria-labelledby : string
children : React.ReactNode
cellPadding : 'condensed' | 'normal' | 'spacious'

# Table.Head

    children : React.ReactNode

# Table.Actions

    children : React.ReactNode

4.Blankslate

# Blankslate

border
narrow
spacious
className
size
