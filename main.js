import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nbeqlzzpxxydgmfactzm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iZXFsenpweHh5ZGdtZmFjdHptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3NzMyMjEsImV4cCI6MjA3MTM0OTIyMX0.x_oBYIkqkgtZCqcjVJb7mipojIAM4sHwsDJsDVutnhs'
const supabase = createClient(supabaseUrl, supabaseKey)

// ─── HOMEPAGE CALCULATOR ───────────────────────────────────────────────
const calcData = { type: null, size: null, access: null, priceRange: null }

const calcFeedback = {
    type: {
        concrete: "Most Scottsdale pools are concrete/gunite due to desert durability.",
        fiberglass: "Fiberglass pools are less common in Scottsdale but remove cleanly.",
        vinyl: "Vinyl liner pools are the most straightforward to remove."
    },
    size: {
        small:  "Small pools (under 300 sq ft) typically range $8K–$12K in Scottsdale.",
        medium: "Medium pools in Scottsdale typically range between $12K–$16K depending on access and soil.",
        large:  "Large estate pools in North Scottsdale/Paradise Valley often range $16K–$22K+"
    },
    access: {
        easy:      "Standard access — our full equipment fleet can operate without restrictions.",
        limited:   "Limited access in Scottsdale properties can impact equipment use and labor time.",
        difficult: "Tight access requires our micro-loader fleet. Common in Old Town and historic corridors."
    }
}

window.calcSelect = function(category, value, el) {
    calcData[category] = value
    el.closest('.calc-opts').querySelectorAll('.calc-opt').forEach(b => b.classList.remove('selected'))
    el.classList.add('selected')

    const fb = document.getElementById('calcFeedback')
    if (fb && calcFeedback[category]?.[value]) fb.textContent = calcFeedback[category][value]

    setTimeout(() => {
        if (category === 'type')   switchCalc('calcStep1', 'calcStep2')
        if (category === 'size')   switchCalc('calcStep2', 'calcStep3')
        if (category === 'access') showCalcResult()
    }, 350)
}

function switchCalc(hide, show) {
    document.getElementById(hide).classList.remove('active')
    document.getElementById(show).classList.add('active')
    document.getElementById('calcFeedback').textContent = ''
}

function showCalcResult() {
    let min = 8000, max = 12000
    if (calcData.type === 'concrete')       { min += 2000; max += 4000 }
    if (calcData.type === 'fiberglass')     { min += 500;  max += 1500 }
    if (calcData.size === 'medium')         { min += 2000; max += 3000 }
    else if (calcData.size === 'large')     { min += 6000; max += 8000 }
    if (calcData.access === 'limited')      { min += 1500; max += 2500 }
    else if (calcData.access === 'difficult') { min += 3000; max += 5000 }

    calcData.priceRange = `$${min.toLocaleString()} – $${max.toLocaleString()}`
    document.getElementById('calcPrice').textContent = calcData.priceRange
    document.getElementById('calcStep3').classList.remove('active')
    document.getElementById('calcResult').classList.add('active')
}

window.calcSubmitLead = async function() {
    const name  = document.getElementById('calcName').value.trim()
    const phone = document.getElementById('calcPhone').value.trim()
    const btn   = document.getElementById('calcSubmitBtn')
    const err   = document.getElementById('calcError')

    if (!name || !phone) { err.style.display = 'block'; err.textContent = 'Please enter your name and phone.'; return }

    btn.disabled = true
    btn.textContent = 'Sending...'
    err.style.display = 'none'

    const { error } = await supabase.from('emd_leads_atlanta').insert([{
        full_name: name,
        phone: phone,
        pool_type: calcData.type,
        pool_size: calcData.size,
        estimated_price_range: calcData.priceRange,
        source_page: 'scottsdale-emd-calculator'
    }])

    if (!error) {
        document.getElementById('calcResult').classList.remove('active')
        document.getElementById('calcDone').classList.add('active')
    } else {
        err.style.display = 'block'
        err.textContent = 'Error sending. Please call us directly.'
        btn.disabled = false
        btn.textContent = 'Get My Estimate'
    }
}

// ─── QUOTE MODAL ──────────────────────────────────────────────────────
window.showQuoteModal = function() {
    const modal = document.getElementById('quoteModal')
    if (!modal) return
    modal.style.display = 'flex'
    document.getElementById('modalStep1').classList.add('active')
    document.getElementById('modalStep2').classList.remove('active')
    document.getElementById('modalSuccess').classList.remove('active')
    document.getElementById('modalProgressBar').style.width = '33%'
}

window.closeQuoteModal = function() {
    const modal = document.getElementById('quoteModal')
    if (modal) modal.style.display = 'none'
}

window.selectModalPool = function(type) {
    window.modalLeadData = { pool_type: type }
    document.getElementById('modalStep1').classList.remove('active')
    document.getElementById('modalStep2').classList.add('active')
    document.getElementById('modalProgressBar').style.width = '66%'
}

window.submitModalLead = async function() {
    const name  = document.getElementById('modalName').value.trim()
    const phone = document.getElementById('modalPhone').value.trim()
    if (!name || !phone) { alert('Please enter your name and phone number.'); return }

    const { error } = await supabase.from('emd_leads_atlanta').insert([{
        full_name: name,
        phone: phone,
        pool_type: window.modalLeadData?.pool_type,
        source_page: 'scottsdale-emd-modal'
    }])

    if (!error) {
        document.getElementById('modalStep2').classList.remove('active')
        document.getElementById('modalSuccess').classList.add('active')
        document.getElementById('modalProgressBar').style.width = '100%'
    }
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Close modal on overlay click
    const modal = document.getElementById('quoteModal')
    if (modal) modal.addEventListener('click', e => { if (e.target === modal) window.closeQuoteModal() })

    // Contact page form
    const contactForm = document.getElementById('contactForm')
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault()
            const btn    = document.getElementById('contactSubmitBtn')
            const errEl  = document.getElementById('contactError')
            const name   = document.getElementById('contactName').value.trim()
            const phone  = document.getElementById('contactPhone').value.trim()
            const pType  = document.getElementById('contactPoolType').value
            const svc    = document.getElementById('contactService').value

            btn.disabled = true; btn.textContent = 'Sending...'; errEl.style.display = 'none'

            const { error } = await supabase.from('emd_leads_atlanta').insert([{
                full_name: name, phone, pool_type: pType,
                source_page: `scottsdale-contact-page | service: ${svc}`
            }])

            if (!error) {
                contactForm.style.display = 'none'
                document.getElementById('formSuccess').style.display = 'block'
            } else {
                errEl.textContent = 'Something went wrong. Please call us directly.'
                errEl.style.display = 'block'
                btn.disabled = false; btn.textContent = 'Send My Project Details →'
            }
        })
    }
})
