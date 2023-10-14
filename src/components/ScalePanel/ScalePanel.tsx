import { useEffect, useState } from "react"
import { MinusSign, PlusSign } from "../icons/Icons";
import styles from "./ScalePanel.module.css"

const scales = [
    { id: 1, value: 0.25 },
    { id: 2, value: 0.30 },
    { id: 3, value: 0.40 },
    { id: 4, value: 0.50 },
    { id: 5, value: 0.60 },
    { id: 6, value: 0.70 },
    { id: 7, value: 0.80 },
    { id: 8, value: 0.90 },
    { id: 9, value: 1 },
    { id: 10, value: 1.25 },
    { id: 11, value: 1.50 },
]

export default function ScalePanel({ treeViewRef }: { treeViewRef: React.RefObject<HTMLUListElement> }) {

    const [isOpen, setIsOpen] = useState(false)
    const [scaleResult, setScaleResult] = useState(1);

    const incrementScale = () => {
        const currentScale = scales.map(scale => scale.value).indexOf(scaleResult)
        console.log(currentScale)
        if (currentScale < scales.length - 1) {

            setScaleResult(scales[currentScale + 1].value)


        }
        setIsOpen(false)
    }

    const decrementScale = () => {
        const currentScale = scales.map(scale => scale.value).indexOf(scaleResult)

        if (currentScale > 0) {
            setScaleResult(scales[currentScale - 1].value)

        }
        setIsOpen(false)
    }

    const handleScale = (e: React.MouseEvent<HTMLButtonElement>): void => {


        setScaleResult(Number.parseFloat(e.currentTarget.value))

        setIsOpen(false)
    }




    return (
        <div className={`${styles.scalePanel}`}>
            <button className={`${styles.incDec_btn}`} onClick={incrementScale}><PlusSign stroke={"#B8BFC1"} width={20} height={20} /></button>

            <div className={`${styles.dropdownScale}`}>
                <button type="button" className={`${styles.scaleResult_btn}`} onClick={() => setIsOpen(!isOpen)}>{(scaleResult * 100).toString() + "%"}</button>
                {isOpen && <ul className={`${styles.dropdown_menu}`} >
                    {scales.map((scale) => (
                        <li key={scale.id}>
                            <button className={`${styles.dropdown_menu__btn} ${scale.value === scaleResult ? styles.pressed : ""}`} value={scale.value} onClick={handleScale}>{(scale.value * 100).toString() + "%"}</button>
                        </li>
                    ))}
                </ul>}
            </div>

            <button className={`${styles.incDec_btn}`} onClick={decrementScale}><MinusSign stroke={"#B8BFC1"} width={20} height={20} /></button>
        </div>
    )
}