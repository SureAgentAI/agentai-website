import React, { useState, useEffect, useRef } from 'react'
import {
  ClipboardCheck,
  Send,
  FileCheck,
  Users,
  Code,
  FileSearch,
  BadgeDollarSign,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

interface WorkflowStepProps {
  icon: React.ElementType
  title: string
  step: number
  isActive: boolean
  rotation: string
  bgColor: string
  iconColor: string
  onHover: (stepIndex: number) => void
  description: string
  wheelRotation: number
}

function WorkflowStep({
  icon: Icon,
  title,
  step,
  isActive,
  rotation,
  bgColor,
  iconColor,
  onHover,
  wheelRotation,
}: WorkflowStepProps) {
  const rotationFloat = parseFloat(rotation.replace('deg', ''))
  const position = rotationFloat + wheelRotation
  const angleRad = (position * Math.PI) / 180

  return (
    <div
      className="absolute transform transition-all duration-300 hover:scale-110 cursor-pointer z-10"
      style={{
        left: `calc(50% + ${Math.cos(angleRad) * 300}px)`,
        top: `calc(50% - ${Math.sin(angleRad) * 300}px)`,
        transform: `translate(-50%, -50%)`,
      }}
      onMouseEnter={() => onHover(step - 1)}
    >
      <div
        className={`w-64 bg-white rounded-xl shadow-sm p-4 border-2 ${
          isActive ? 'border-primary-500' : 'border-gray-100'
        } hover:border-primary-500 hover:shadow-lg transition-all duration-200`}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg" style={{ backgroundColor: bgColor }}>
            <Icon size={24} style={{ color: iconColor }} />
          </div>
          <div className="text-sm font-medium text-gray-500">Step {step}</div>
        </div>
        <div className="font-semibold text-gray-800 text-sm sm:text-base">{title}</div>
      </div>
    </div>
  )
}

interface MobileCarouselProps {
  steps: StepData[]
  activeStep: number
  groups: typeof groupColors
  onStepChange: (index: number) => void
}

interface StepData {
  icon: React.ElementType
  title: string
  rotation: string
  group: keyof typeof groupColors
  description: string
}

const groupColors = {
  group1: {
    bg: '#F8FAFC',
    iconColor: '#4B556C',
  },
  group2: {
    bg: '#ECFDF5',
    iconColor: '#278A5B',
  },
  group3: {
    bg: '#FFF7ED',
    iconColor: '#FFA726',
  },
}

function MobileCarousel({ steps, activeStep, groups, onStepChange }: MobileCarouselProps) {
  return (
    <div className="w-full max-w-[400px] mx-auto px-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => onStepChange((activeStep - 1 + steps.length) % steps.length)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>

          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">
              Step {activeStep + 1} of {steps.length}
            </div>
            <div className="text-xs text-gray-400">
              {steps[activeStep].group.replace('group', 'Phase ')}
            </div>
          </div>

          <button
            onClick={() => onStepChange((activeStep + 1) % steps.length)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="text-center mb-6">
          <div
            className="p-4 rounded-xl mx-auto mb-4 w-20 h-20 flex items-center justify-center"
            style={{
              backgroundColor: groups[steps[activeStep].group].bg,
              color: groups[steps[activeStep].group].iconColor,
            }}
          >
            {React.createElement(steps[activeStep].icon, { size: 32 })}
          </div>
          <h3 className="font-bold text-xl text-gray-800 mb-3">{steps[activeStep].title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{steps[activeStep].description}</p>
        </div>

        <div className="flex justify-center gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-200 ${
                index === activeStep ? 'bg-primary-500' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => onStepChange(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function RCMWheel() {
  const [activeStep, setActiveStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [wheelRotation, setWheelRotation] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const rotationCountRef = useRef(0)

  const steps: StepData[] = [
    {
      icon: ClipboardCheck,
      title: 'Eligibility Verification',
      rotation: '270deg',
      group: 'group1',
      description:
        'Verify patient eligibility with insurance providers to ensure coverage for services.',
    },
    {
      icon: Users,
      title: 'Patient Demographics',
      rotation: '315deg',
      group: 'group1',
      description:
        'Collect and verify patient information for accurate billing and record-keeping.',
    },
    {
      icon: Code,
      title: 'Coding',
      rotation: '0deg',
      group: 'group1',
      description:
        'Assign appropriate medical codes to procedures and diagnoses for billing purposes.',
    },
    {
      icon: FileSearch,
      title: 'Coding Audits',
      rotation: '45deg',
      group: 'group2',
      description:
        'Review coding accuracy to ensure compliance and maximize appropriate reimbursement.',
    },
    {
      icon: Send,
      title: 'Claim Submission',
      rotation: '90deg',
      group: 'group2',
      description: 'Submit clean claims to payers in the required format for timely processing.',
    },
    {
      icon: FileCheck,
      title: 'Payment Posting',
      rotation: '135deg',
      group: 'group3',
      description:
        'Record payments received from insurance companies and patients against outstanding balances.',
    },
    {
      icon: BadgeDollarSign,
      title: 'AR Management',
      rotation: '180deg',
      group: 'group3',
      description: 'Manage accounts receivable to ensure timely collection of all due payments.',
    },
    {
      icon: ShieldAlert,
      title: 'Denial Management',
      rotation: '225deg',
      group: 'group3',
      description: 'Address and appeal denied claims to maximize revenue recovery.',
    },
  ]

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleManualStepSelection = (stepIndex: number) => {
    setActiveStep(stepIndex)
    setIsPaused(true)
    rotationCountRef.current = 0
  }

  // Single synchronized system for wheel rotation and step advancement
  useEffect(() => {
    const interval = setInterval(() => {
      // Wheel rotation always continues
      setWheelRotation((prev) => prev - 45)

      if (isPaused) {
        // When paused, count rotations but don't advance step
        rotationCountRef.current += 1

        // After 3 rotations (24 steps = 8 steps x 3), resume step advancement
        if (rotationCountRef.current >= 3) {
          setIsPaused(false)
          rotationCountRef.current = 0
        }
      } else {
        // Normal operation: step advances with wheel rotation
        setActiveStep((prev) => (prev + 1) % steps.length)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isPaused, steps.length])

  // If mobile, show carousel instead of wheel
  if (isMobile) {
    return (
      <div className="w-full">
        <MobileCarousel
          steps={steps}
          activeStep={activeStep}
          groups={groupColors}
          onStepChange={handleManualStepSelection}
        />
      </div>
    )
  }

  return (
    <div className="w-full max-w-[700px] mx-auto">
      <div className="relative h-[700px] transform-gpu scale-100 origin-top">
        <div className="absolute inset-0 m-auto w-[90dvw] h-[90dvw] max-w-[600px] max-h-[600px] rounded-full border-4 border-dashed border-gray-200">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20" />
        </div>

        {steps.map((step, index) => (
          <WorkflowStep
            key={index}
            icon={step.icon}
            title={step.title}
            step={index + 1}
            rotation={step.rotation}
            isActive={index === activeStep}
            bgColor={groupColors[step.group].bg}
            iconColor={groupColors[step.group].iconColor}
            onHover={handleManualStepSelection}
            description={step.description}
            wheelRotation={wheelRotation}
          />
        ))}

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="bg-white p-6 rounded-xl shadow-md max-w-sm transition-all duration-300 scale-95">
            <div
              className="p-3 rounded-lg mx-auto mb-3 w-16 h-16 flex items-center justify-center"
              style={{
                backgroundColor: groupColors[steps[activeStep].group].bg,
                color: groupColors[steps[activeStep].group].iconColor,
              }}
            >
              {React.createElement(steps[activeStep].icon, { size: 32 })}
            </div>
            <h3 className="font-bold text-2xl text-gray-800 mb-2">{steps[activeStep].title}</h3>
            <p className="text-gray-600">{steps[activeStep].description}</p>
            <div className="text-sm text-gray-400 mt-4">
              Step {activeStep + 1} of {steps.length}
            </div>
            <div className="flex justify-center gap-2 mt-3">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-colors duration-200 ${
                    index === activeStep ? 'bg-primary-500' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => handleManualStepSelection(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
