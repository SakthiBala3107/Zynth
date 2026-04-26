import React, { useEffect, useRef, useState } from 'react'
import { Router, useLocation, useNavigate } from 'react-router'
import { generate3DView } from '../../lib/ai.action'
import { Box, Download, RefreshCcw } from 'lucide-react'
import Button from '../../components/ui/Button'
import clsx from 'clsx'

const VisualizerId = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const { initalImage, name, initialRender } = location.state || {}
    const hasIntialGenerated = useRef(false)

    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [currentImage, setCurrentImage] = useState<string | null>(initialRender || null)

    // functions
    const handleBack = () => navigate('/')

    const runGeneration = async () => {
        if (!initalImage) return;

        try {
            setIsProcessing(true)
            const result = await generate3DView({ sourceImage: initalImage })

            if (result?.renderedImage) {
                setCurrentImage(result?.renderedImage)
            }
        } catch (e) {
            console.error('Generation failed:', e)

        } finally {
            setIsProcessing(false)
        }
    }

    useEffect(() => {
        if (!initalImage || hasIntialGenerated?.current) return

        if (initialRender) {
            setCurrentImage(initialRender);
            hasIntialGenerated.current = true
            return
        }
        hasIntialGenerated.current = true
        runGeneration()
    }, [, initalImage, initialRender])



    //    rendering-stuffs
    return (
        <div className="visualizer">
            <nav className="topbar">
                <div className='brand'>
                    <Box className="logo" />
                    <span className="name">Zynth</span>
                </div>
            </nav>
            <section className='content'>
                <div className="panel">
                    <div className="panel-header">
                        <div className="panel-meta" >
                            <p>Project</p>
                            <h2>{'Untitled Project'}</h2>
                            <p className="note">Created by You</p>
                        </div>
                        {/*  */}
                        <div className="panel-actions">
                            <Button size='sm' onClick={() => { }} className='export' disabled={!currentImage}>
                                <Download className='w-4 h-4 mr-2' />
                                Export
                            </Button>
                            <Button size='sm' onClick={() => { }} className='share' disabled={!currentImage}>
                                <Download className='w-4 h-4 mr-2' />
                                Share
                            </Button>
                        </div>
                    </div>
                    <div className={clsx('render-area', isProcessing && 'is-processing')}>
                        {currentImage ? (<img src={currentImage} alt="AI Render" className='render-img' />)
                            : (<div className="render-placeholder">
                                {initalImage && (<img src={initalImage} alt='Original' className='render-fallback' />)}
                            </div>

                            )}
                        {isProcessing && (
                            <div className="render-overlay">
                                <div className="rendering-card">
                                    <RefreshCcw className='spinner' />
                                    <span className="title">Rendering...</span>
                                    <span className="subtitle">Generating your 3D visualization ...</span>
                                </div>
                            </div>)}


                    </div>
                    {/*  */}
                </div>
            </section>

            {/*  */}
            {initalImage && (<div className="image-container">
                <h2> Source Image</h2>
                <img src={initalImage} alt="source" />
            </div>)}

        </div>
    )
}

export default VisualizerId