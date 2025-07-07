import { useRef } from "react";

export default function Card({
    fixed,
    title="",
}) {
    const cardRef = useRef(null)
    const cardInnerRef = useRef(null)
    const dragging = useRef(false)
    const offset = useRef({ x: 0, y: 0 })

    const handleMouseDown = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()

        dragging.current = true
        offset.current = {
            x: e.clientX - rect.x,
            y: e.clientY - rect.y
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    const handleMouseDownCard = (e) => {
        const card = cardInnerRef.current
        card.style.scale = 1.025
    }

    const handleMouseUpCard = (e) => {
        const card = cardInnerRef.current
        card.style.scale = 1.0
    }

    const handleMouseMove = (e) => {
        if (!dragging.current) return

        const card = cardRef.current
        card.style.left = `${e.clientX - offset.current.x}px`
        card.style.top = `${e.clientY - offset.current.y}px`
    }

    const handleMouseMoveCard = (e) => {
        const card = cardRef.current
        const cardInner = cardInnerRef.current
        const rect = card.getBoundingClientRect()

        const x = e.clientX - rect.x
        const y = e.clientY - rect.y

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = ((y - centerY)/centerY)*10;
        const rotateY = ((x - centerX)/centerX)*-10;

        cardInner.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }

    const handleMouseLeaveCard = (e) => {
        const card = cardInnerRef.current
        card.style.transform = `perspective(600px) rotateX(0deg) rotateY(0deg)`
    }

    const handleMouseUp = (e) => {
        dragging.current = false
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }

    return (
        <div
            ref={cardRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMoveCard}
            onMouseLeave={handleMouseLeaveCard}
            className="absolute"
        >
            <div
                ref={cardInnerRef}
                style={{ transition: 'transform 200ms ease, background 300ms cubic-bezier(0.4, 0, 0.2, 1), scale 150ms ease' }}
                className="flex flex-col relative bg-gruv-bg1 w-[249.23px] h-[349px] rounded-lg p-4 select-none hover:bg-gruv-bg2"
                onMouseDown={handleMouseDownCard}
                onMouseUp={handleMouseUpCard}
            >
                <h2 className="text-gruv-yellow pb-2 font-sans font-bold">{title}</h2>
                <div className="w-full h-full bg-gruv-bg">
                </div>
            </div>
        </div>
    )
}
