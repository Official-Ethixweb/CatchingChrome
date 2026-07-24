import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 9)
        self.setFillColor(colors.HexColor("#4A5568"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(54, 750, "Catching Chrome — Google Ads Search Campaign Strategy")
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.5)
            self.line(54, 742, 558, 742)
            
        # Footer
        footer_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 36, footer_text)
        self.drawString(54, 36, "CONFIDENTIAL & PROPRIETARY — GOOGLE ADS STRATEGY")
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.5)
        self.line(54, 48, 558, 48)
        
        self.restoreState()

def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=64,
        bottomMargin=64
    )

    styles = getSampleStyleSheet()

    # Custom Color Palette
    PRIMARY = colors.HexColor("#0E2A3B")    # Navy / Ink
    ACCENT = colors.HexColor("#008891")     # Deep Teal / Accent
    ACCENT_LIGHT = colors.HexColor("#E6F4F1")
    TEXT_DARK = colors.HexColor("#1A202C")
    BG_LIGHT = colors.HexColor("#F8FAFC")
    BORDER_COLOR = colors.HexColor("#E2E8F0")

    # Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=PRIMARY,
        spaceAfter=6
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=ACCENT,
        spaceAfter=15
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=19,
        textColor=PRIMARY,
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=ACCENT,
        spaceBefore=10,
        spaceAfter=6,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=TEXT_DARK,
        spaceAfter=6
    )

    bold_body_style = ParagraphStyle(
        'BoldBody_Custom',
        parent=body_style,
        fontName='Helvetica-Bold'
    )

    tbl_header_style = ParagraphStyle(
        'TblHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.white,
        alignment=0
    )

    tbl_cell_style = ParagraphStyle(
        'TblCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10.5,
        textColor=TEXT_DARK
    )

    tbl_cell_code = ParagraphStyle(
        'TblCellCode',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10.5,
        textColor=PRIMARY
    )

    story = []

    # Title Block
    story.append(Paragraph("Google Ads Search-Campaign Strategy & Keyword Plan", title_style))
    story.append(Paragraph("Catching Chrome Guide Service — Derived strictly from codebase content", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY, spaceBefore=0, spaceAfter=12))

    # Context Metadata Table
    ctx_data = [
        [Paragraph("<b>Business / Offer:</b>", body_style), Paragraph("Catching Chrome Guide Service — Guided Fishing Trips & Commercial Fleet Charters", body_style)],
        [Paragraph("<b>Target Geography:</b>", body_style), Paragraph("Oregon & Pacific Northwest (Columbia River, Willamette River, Deschutes, Coastal Tributaries)", body_style)],
        [Paragraph("<b>Conversion Actions:</b>", body_style), Paragraph("Contact Form Fill (/contact, group quote requests) & Direct Phone Calls ((503) 936-9090)", body_style)],
        [Paragraph("<b>Order / Lead Value:</b>", body_style), Paragraph("$150 – $250 / person (Salmon/Steelhead/Sturgeon $250, Half-day $150, Crab $150+)", body_style)],
        [Paragraph("<b>Currency & Market:</b>", body_style), Paragraph("USD ($), Oregon / PNW Market, USA", body_style)],
        [Paragraph("<b>Main Page Route:</b>", body_style), Paragraph("<code>/src/routes/index.tsx</code> (Home Page /)", body_style)],
        [Paragraph("<b>Landing Page Route:</b>", body_style), Paragraph("<code>/src/routes/commercial.tsx</code> (Commercial & Corporate Charters /commercial)", body_style)],
        [Paragraph("<b>Competitor Exclusions:</b>", body_style), Paragraph("General PNW fishing guide brand terms excluded in negative list", body_style)]
    ]
    t_ctx = Table(ctx_data, colWidths=[130, 374])
    t_ctx.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('LINEBELOW', (0,0), (-1,-2), 0.5, BORDER_COLOR),
    ]))
    story.append(t_ctx)
    story.append(Spacer(1, 12))

    # STEP 1: PAGE ANALYSIS
    story.append(Paragraph("Step 1 — In-Depth Page Analysis", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=ACCENT, spaceBefore=0, spaceAfter=8))

    p1_text = """
    <b>1. Main Page (<code>/src/routes/index.tsx</code> & Components)</b><br/>
    • <b>a) Product/Service Names:</b> Guided Fishing Excursions (Fall Chinook Salmon, Spring Chinook Salmon, Winter Steelhead, Columbia Sturgeon, Dungeness Crab, American Shad), 22-FT River Wild Sled (Flagship boat), 18-FT Clackacraft Drift Boat.<br/>
    • <b>b) Problem Solved:</b> Provides anglers, families, and small groups with high-end boats, expert guide leadership, all rods/tackle/bait, and complete fish cleaning/filleting/packing without requiring boat ownership or gear investment.<br/>
    • <b>c) Buyer Stage:</b> Bottom-of-Funnel (BOFU) commercial intent. Anglers ready to book a specific guided excursion in Oregon.<br/>
    • <b>d) Pricing, Guarantees, Locations & Qualifiers:</b> Full Day Salmon $250 / Half Day $150; Steelhead $250/person; Sturgeon $250/person; Crab from $150/person; Deposit $50/person. <i>Captain's Guarantee:</i> Full refund/rescheduling if captain cancels for weather/safety. 14+ day cancellation refund. Captain Ryan: 40+ yrs exp, 100% USCG licensed, CPR/First Aid certified. Locations: Columbia River Gorge, Willamette, Deschutes, Coastal tributaries across 19 exact launch ramps (Garibaldi, Hood River, St Helens, Freds Marina, Warrenton, etc.).<br/>
    • <b>e) Explicitly NOT Offered:</b> Fishing license sales (guests must buy prior), lodging/catering, deep-sea ocean tuna/halibut charters, fly-only school instruction.
    """
    story.append(Paragraph(p1_text, body_style))
    story.append(Spacer(1, 4))

    p2_text = """
    <b>2. Landing Page (<code>/src/routes/commercial.tsx</code> — Commercial Charters)</b><br/>
    • <b>a) Product/Service Names:</b> Commercial & Corporate Charters, Multi-Boat Coordinated Fleet Service, Team Outings, Client Entertaining Charters, Large Private Parties (reunions, bachelor parties, milestone birthdays).<br/>
    • <b>b) Problem Solved:</b> Overcomes standard single-boat limits (3-4 anglers max) by coordinating a fleet of boats to fish the same water on the same day under one unified booking and written quote.<br/>
    • <b>c) Buyer Stage:</b> BOFU Corporate/Enterprise decision-makers (HR, executive assistants, event coordinators, sales leads) needing turn-key group outings.<br/>
    • <b>d) Pricing, Guarantees, Locations & Qualifiers:</b> Quoted per person with everything covered (no per-boat surprises, no gear line items). Single invoice & COI paperwork provided. Fully USCG licensed & insured captains on every vessel. Locations: Oregon rivers (Columbia River, etc.).<br/>
    • <b>e) Explicitly NOT Offered:</b> Single-angler walk-ons, onboard food/beverage catering, conference rooms/land venues, fixed off-the-shelf pricing (custom quoted).
    """
    story.append(Paragraph(p2_text, body_style))
    story.append(Spacer(1, 10))

    # STEP 3: AD GROUP A KEYWORDS
    story.append(Paragraph("Step 3 — Keywords Deliverable", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=ACCENT, spaceBefore=0, spaceAfter=8))
    story.append(Paragraph("<b>Ad Group A: Main Page (Guided Fishing Trips) — 20 Keywords</b>", h2_style))

    kw_a_headers = [Paragraph("Keyword (formatted)", tbl_header_style), Paragraph("Match Type", tbl_header_style), Paragraph("Search Intent", tbl_header_style), Paragraph("Why It Converts", tbl_header_style), Paragraph("Est. Comp.", tbl_header_style)]
    
    kw_a_data = [kw_a_headers,
        [Paragraph("<code>[oregon salmon fishing guide service]</code>", tbl_cell_code), Paragraph("EXACT", tbl_cell_style), Paragraph("High Commercial", tbl_cell_style), Paragraph("Direct BOFU intent to hire an Oregon salmon guide service.", tbl_cell_style), Paragraph("High", tbl_cell_style)],
        [Paragraph("<code>[columbia river chinook fishing charter]</code>", tbl_cell_code), Paragraph("EXACT", tbl_cell_style), Paragraph("High Commercial", tbl_cell_style), Paragraph("High conviction term for booking a Chinook charter on Columbia River.", tbl_cell_style), Paragraph("High", tbl_cell_style)],
        [Paragraph("<code>\"guided salmon fishing trips in oregon\"</code>", tbl_cell_code), Paragraph("PHRASE", tbl_cell_style), Paragraph("High Commercial", tbl_cell_style), Paragraph("Captures searchers actively shopping for guided Oregon salmon trips.", tbl_cell_style), Paragraph("High", tbl_cell_style)],
        [Paragraph("<code>[winter steelhead guide columbia river]</code>", tbl_cell_code), Paragraph("EXACT", tbl_cell_style), Paragraph("High Commercial", tbl_cell_style), Paragraph("Targets anglers seeking winter steelhead guided trips on Columbia.", tbl_cell_style), Paragraph("Med", tbl_cell_style)],
        [Paragraph("<code>\"book columbia river sturgeon charter\"</code>", tbl_cell_code), Paragraph("PHRASE", tbl_cell_style), Paragraph("High Commercial", tbl_cell_style), Paragraph("Action verb 'book' matches high intent sturgeon charter searchers.", tbl_cell_style), Paragraph("Med", tbl_cell_style)],
        [Paragraph("<code>[oregon dungeness crab fishing charter]</code>", tbl_cell_code), Paragraph("EXACT", tbl_cell_style), Paragraph("High Commercial", tbl_cell_style), Paragraph("Specific booking term for coastal Dungeness crab charter trips.", tbl_cell_style), Paragraph("Med", tbl_cell_style)],
        [Paragraph("<code>\"columbia river gorge fishing guide\"</code>", tbl_cell_code), Paragraph("PHRASE", tbl_cell_style), Paragraph("Commercial", tbl_cell_style), Paragraph("Exact regional match for guided fishing in Columbia River Gorge.", tbl_cell_style), Paragraph("High", tbl_cell_style)],
        [Paragraph("<code>[full day salmon charter cost oregon]</code>", tbl_cell_code), Paragraph("EXACT", tbl_cell_style), Paragraph("Commercial", tbl_cell_style), Paragraph("Price-investigating buyer ready to pay $250 for full day charter.", tbl_cell_style), Paragraph("Med", tbl_cell_style)],
        [Paragraph("<code>\"willamette river guided fishing trips\"</code>", tbl_cell_code), Paragraph("PHRASE", tbl_cell_style), Paragraph("Commercial", tbl_cell_style), Paragraph("Direct match for anglers booking guided trips on Willamette River.", tbl_cell_style), Paragraph("Med", tbl_cell_style)],
        [Paragraph("<code>\"coastal tributaries steelhead fishing guide\"</code>", tbl_cell_code), Paragraph("PHRASE", tbl_cell_style), Paragraph("Commercial", tbl_cell_style), Paragraph("Targets anglers hiring guides for coastal tributary steelhead.", tbl_cell_style), Paragraph("Low", tbl_cell_style)],
        [Paragraph("<code>[licensed uscg salmon captain oregon]</code>", tbl_cell_code), Paragraph("EXACT", tbl_cell_style), Paragraph("High Commercial", tbl_cell_style), Paragraph("Qualifies buyers requiring USCG-certified captain credentials.", tbl_cell_style), Paragraph("Low", tbl_cell_style)],
        [Paragraph("<code>\"family friendly shad fishing charter oregon\"</code>", tbl_cell_code), Paragraph("PHRASE", tbl_cell_style), Paragraph("Commercial", tbl_cell_style), Paragraph("Commercial family searcher looking for light-gear shad trip.", tbl_cell_style), Paragraph("Low", tbl_cell_style)],
        [Paragraph("<code>[garibaldi marina fishing guide service]</code>", tbl_cell_code), Paragraph("EXACT", tbl_cell_style), Paragraph("High Commercial", tbl_cell_style), Paragraph("Hyper-local intent matching one of Captain Ryan's exact 19 ramps.", tbl_cell_style), Paragraph("Low", tbl_cell_style)],
        [Paragraph("<code>\"hood river salmon fishing charters\"</code>", tbl_cell_code), Paragraph("PHRASE", tbl_cell_style), Paragraph("Commercial", tbl_cell_style), Paragraph("Geo-qualified match for salmon charters launching at Hood River.", tbl_cell_style), Paragraph("Med", tbl_cell_style)],
        [Paragraph("<code>[warrenton marina dungeness crab charter]</code>", tbl_cell_code), Paragraph("EXACT", tbl_cell_style), Paragraph("High Commercial", tbl_cell_style), Paragraph("Launch point booking keyword for crabbing out of Warrenton.", tbl_cell_style), Paragraph("Low", tbl_cell_style)],
        [Paragraph("<code>\"chinook landing boat ramp fishing guide\"</code>", tbl_cell_code), Paragraph("PHRASE", tbl_cell_style), Paragraph("Commercial", tbl_cell_style), Paragraph("Direct match for hiring a guide launching at Chinook Landing.", tbl_cell_style), Paragraph("Low", tbl_cell_style)],
        [Paragraph("<code>[guided coho salmon charter oregon]</code>", tbl_cell_code), Paragraph("EXACT", tbl_cell_style), Paragraph("High Commercial", tbl_cell_style), Paragraph("High intent search for guided Coho salmon charter in Oregon.", tbl_cell_style), Paragraph("Med", tbl_cell_style)],
        [Paragraph("<code>\"best salmon guide service in oregon\"</code>", tbl_cell_code), Paragraph("PHRASE", tbl_cell_style), Paragraph("Commercial", tbl_cell_style), Paragraph("Buyer comparing top-rated guide services in Oregon to book.", tbl_cell_style), Paragraph("High", tbl_cell_style)],
        [Paragraph("<code>[columbia river spring chinook guide]</code>", tbl_cell_code), Paragraph("EXACT", tbl_cell_style), Paragraph("High Commercial", tbl_cell_style), Paragraph("Seasonal high-intent booking search for prize spring Chinook.", tbl_cell_style), Paragraph("High", tbl_cell_style)],
        [Paragraph("<code>\"hire guided fishing boat oregon\"</code>", tbl_cell_code), Paragraph("PHRASE", tbl_cell_style), Paragraph("Commercial", tbl_cell_style), Paragraph("Transactional query looking to hire a guided boat in Oregon.", tbl_cell_style), Paragraph("Med", tbl_cell_style)]
    ]

    t_kw_a = Table(kw_a_data, colWidths=[120, 48, 62, 224, 50])
    t_kw_a.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_LIGHT])
    ]))
    story.append(t_kw_a)
    story.append(Spacer(1, 10))

    # AD GROUP B KEYWORDS
    story.append(Paragraph("<b>Ad Group B: Landing Page (Commercial & Corporate Charters) — 15 Keywords</b>", h2_style))

    kw_b_headers = [Paragraph("Keyword (formatted)", tbl_header_style), Paragraph("Match Type", tbl_header_style), Paragraph("Search Intent", tbl_header_style), Paragraph("Why It Converts", tbl_header_style), Paragraph("Est. Comp.", tbl_header_style)]

    kw_b_data = [kw_b_headers,
        [Paragraph("<code>[corporate fishing charters oregon]</code>", tbl_cell_code), Paragraph("EXACT", tbl_cell_style), Paragraph("High Commercial", tbl_cell_style), Paragraph("High conviction intent for corporate company fishing charters.", tbl_cell_style), Paragraph("High", tbl_cell_style)],
        [Paragraph("<code>\"corporate group fishing trips oregon\"</code>", tbl_cell_code), Paragraph("PHRASE", tbl_cell_style), Paragraph("High Commercial", tbl_cell_style), Paragraph("Targets corporate planners organizing group trips in Oregon.", tbl_cell_style), Paragraph("High", tbl_cell_style)],
        [Paragraph("<code>[multi boat corporate charter columbia river]</code>", tbl_cell_code), Paragraph("EXACT", tbl_cell_style), Paragraph("High Commercial", tbl_cell_style), Paragraph("Matches unique multi-boat fleet offer on Columbia River.", tbl_cell_style), Paragraph("Med", tbl_cell_style)],
        [Paragraph("<code>\"company team outing fishing charters\"</code>", tbl_cell_code), Paragraph("PHRASE", tbl_cell_style), Paragraph("Commercial", tbl_cell_style), Paragraph("Intent to hire fishing charter fleet for company team outings.", tbl_cell_style), Paragraph("Med", tbl_cell_style)],
        [Paragraph("<code>[client entertaining fishing charters oregon]</code>", tbl_cell_code), Paragraph("EXACT", tbl_cell_style), Paragraph("High Commercial", tbl_cell_style), Paragraph("Direct match for client entertaining charter bookings in Oregon.", tbl_cell_style), Paragraph("Med", tbl_cell_style)],
        [Paragraph("<code>\"large group fishing charters oregon\"</code>", tbl_cell_code), Paragraph("PHRASE", tbl_cell_style), Paragraph("Commercial", tbl_cell_style), Paragraph("High intent search for large group multi-boat fishing charters.", tbl_cell_style), Paragraph("Med", tbl_cell_style)],
        [Paragraph("<code>[bachelor party fishing charter columbia river]</code>", tbl_cell_code), Paragraph("EXACT", tbl_cell_style), Paragraph("High Commercial", tbl_cell_style), Paragraph("BOFU booking search for private multi-boat party fishing trips.", tbl_cell_style), Paragraph("Med", tbl_cell_style)],
        [Paragraph("<code>\"corporate fishing event quotes oregon\"</code>", tbl_cell_code), Paragraph("PHRASE", tbl_cell_style), Paragraph("Commercial", tbl_cell_style), Paragraph("Intent to request written quotes for corporate fishing events.", tbl_cell_style), Paragraph("Low", tbl_cell_style)],
        [Paragraph("<code>[insured multi boat fishing guide oregon]</code>", tbl_cell_code), Paragraph("EXACT", tbl_cell_style), Paragraph("High Commercial", tbl_cell_style), Paragraph("Commercial buyer requiring insured guides & COI documentation.", tbl_cell_style), Paragraph("Low", tbl_cell_style)],
        [Paragraph("<code>\"company team building fishing trips\"</code>", tbl_cell_code), Paragraph("PHRASE", tbl_cell_style), Paragraph("Commercial", tbl_cell_style), Paragraph("HR/event planner searching team building trips on Oregon rivers.", tbl_cell_style), Paragraph("Med", tbl_cell_style)],
        [Paragraph("<code>[corporate salmon fishing charters oregon]</code>", tbl_cell_code), Paragraph("EXACT", tbl_cell_style), Paragraph("High Commercial", tbl_cell_style), Paragraph("Specific corporate booking term for multi-boat salmon trips.", tbl_cell_style), Paragraph("High", tbl_cell_style)],
        [Paragraph("<code>\"private party multi boat fishing charter\"</code>", tbl_cell_code), Paragraph("PHRASE", tbl_cell_style), Paragraph("Commercial", tbl_cell_style), Paragraph("Direct search for milestone private events needing multi-boat fleet.", tbl_cell_style), Paragraph("Low", tbl_cell_style)],
        [Paragraph("<code>[licensed corporate fishing fleet oregon]</code>", tbl_cell_code), Paragraph("EXACT", tbl_cell_style), Paragraph("High Commercial", tbl_cell_style), Paragraph("High value lead searching USCG licensed corporate fishing fleets.", tbl_cell_style), Paragraph("Low", tbl_cell_style)],
        [Paragraph("<code>\"group salmon charter quote oregon\"</code>", tbl_cell_code), Paragraph("PHRASE", tbl_cell_style), Paragraph("Commercial", tbl_cell_style), Paragraph("Intent to request per-person quotes for group salmon charters.", tbl_cell_style), Paragraph("Med", tbl_cell_style)],
        [Paragraph("<code>[milestone birthday fishing charter fleet]</code>", tbl_cell_code), Paragraph("EXACT", tbl_cell_style), Paragraph("High Commercial", tbl_cell_style), Paragraph("Intent to book multi-boat fleet for large birthday celebrations.", tbl_cell_style), Paragraph("Low", tbl_cell_style)]
    ]

    t_kw_b = Table(kw_b_data, colWidths=[120, 48, 62, 224, 50])
    t_kw_b.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_LIGHT])
    ]))
    story.append(t_kw_b)
    story.append(Spacer(1, 10))

    # STEP 4: NEGATIVE KEYWORDS
    story.append(Paragraph("Step 4 — Negative Keywords Deliverable (35 Total)", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=ACCENT, spaceBefore=0, spaceAfter=8))
    story.append(Paragraph("<b>Ad Group A Negatives (Main Page) — 20 Negatives</b>", h2_style))

    neg_headers = [Paragraph("Negative Keyword", tbl_header_style), Paragraph("Match Type", tbl_header_style), Paragraph("Waste Category Prevented", tbl_header_style), Paragraph("Ad Group", tbl_header_style)]

    neg_a_data = [neg_headers,
        [Paragraph("<code>free</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Free seekers, free fishing days, free gear giveaways.", tbl_cell_style), Paragraph("Ad Group A", tbl_cell_style)],
        [Paragraph("<code>cheap</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Discount seekers; service charges premium rates ($150-$250).", tbl_cell_style), Paragraph("Ad Group A", tbl_cell_style)],
        [Paragraph("<code>jobs</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Job seekers, guide employment, deckhand positions.", tbl_cell_style), Paragraph("Ad Group A", tbl_cell_style)],
        [Paragraph("<code>careers</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Career opportunity searches.", tbl_cell_style), Paragraph("Ad Group A", tbl_cell_style)],
        [Paragraph("<code>salary</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Queries about fishing guide earnings/pay rates.", tbl_cell_style), Paragraph("Ad Group A", tbl_cell_style)],
        [Paragraph("<code>internship</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Internship and student training seekers.", tbl_cell_style), Paragraph("Ad Group A", tbl_cell_style)],
        [Paragraph("<code>diy</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Do-it-yourself anglers not seeking a paid guide.", tbl_cell_style), Paragraph("Ad Group A", tbl_cell_style)],
        [Paragraph("<code>\"how to\"</code>", tbl_cell_code), Paragraph("Phrase Negative", tbl_cell_style), Paragraph("Tutorial & instructional how-to searches.", tbl_cell_style), Paragraph("Ad Group A", tbl_cell_style)],
        [Paragraph("<code>guidebook</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Book/map buyers looking for reading material vs guide service.", tbl_cell_style), Paragraph("Ad Group A", tbl_cell_style)],
        [Paragraph("<code>course</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Educational/training class seekers.", tbl_cell_style), Paragraph("Ad Group A", tbl_cell_style)],
        [Paragraph("<code>training</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Guide licensing classes / boating safety training.", tbl_cell_style), Paragraph("Ad Group A", tbl_cell_style)],
        [Paragraph("<code>certification</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Captain license certification course searches.", tbl_cell_style), Paragraph("Ad Group A", tbl_cell_style)],
        [Paragraph("<code>pdf</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Free PDF map/manual/report downloaders.", tbl_cell_style), Paragraph("Ad Group A", tbl_cell_style)],
        [Paragraph("<code>\"what is\"</code>", tbl_cell_code), Paragraph("Phrase Negative", tbl_cell_style), Paragraph("Top-of-funnel informational queries.", tbl_cell_style), Paragraph("Ad Group A", tbl_cell_style)],
        [Paragraph("<code>definition</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Dictionary/glossary definition searches.", tbl_cell_style), Paragraph("Ad Group A", tbl_cell_style)],
        [Paragraph("<code>wikipedia</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Research seekers reading encyclopedia articles.", tbl_cell_style), Paragraph("Ad Group A", tbl_cell_style)],
        [Paragraph("<code>reddit</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Forum discussion thread searchers.", tbl_cell_style), Paragraph("Ad Group A", tbl_cell_style)],
        [Paragraph("<code>quora</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Q&A community forum searchers.", tbl_cell_style), Paragraph("Ad Group A", tbl_cell_style)],
        [Paragraph("<code>tuna</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Offshore deep sea tuna fishing (not offered).", tbl_cell_style), Paragraph("Ad Group A", tbl_cell_style)],
        [Paragraph("<code>halibut</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Ocean bottom-fish/halibut charters (not offered).", tbl_cell_style), Paragraph("Ad Group A", tbl_cell_style)]
    ]

    t_neg_a = Table(neg_a_data, colWidths=[100, 85, 239, 80])
    t_neg_a.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_LIGHT])
    ]))
    story.append(t_neg_a)
    story.append(Spacer(1, 10))

    # AD GROUP B NEGATIVES
    story.append(Paragraph("<b>Ad Group B Negatives (Landing Page — Commercial) — 15 Negatives</b>", h2_style))

    neg_b_data = [neg_headers,
        [Paragraph("<code>\"single angler\"</code>", tbl_cell_code), Paragraph("Phrase Negative", tbl_cell_style), Paragraph("Individual single-boat seekers (commercial is multi-boat group).", tbl_cell_style), Paragraph("Ad Group B", tbl_cell_style)],
        [Paragraph("<code>discount</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Cheap group discount seekers.", tbl_cell_style), Paragraph("Ad Group B", tbl_cell_style)],
        [Paragraph("<code>hiring</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Deckhand or guide employment applicants.", tbl_cell_style), Paragraph("Ad Group B", tbl_cell_style)],
        [Paragraph("<code>vacancy</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Job vacancy searches.", tbl_cell_style), Paragraph("Ad Group B", tbl_cell_style)],
        [Paragraph("<code>rental</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Bareboat rental/boat hire without guide service.", tbl_cell_style), Paragraph("Ad Group B", tbl_cell_style)],
        [Paragraph("<code>kayak</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Wrong vessel type (commercial page offers powerboat fleet).", tbl_cell_style), Paragraph("Ad Group B", tbl_cell_style)],
        [Paragraph("<code>catering</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Standalone food catering requests.", tbl_cell_style), Paragraph("Ad Group B", tbl_cell_style)],
        [Paragraph("<code>hotel</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Lodging/hotel bundle queries.", tbl_cell_style), Paragraph("Ad Group B", tbl_cell_style)],
        [Paragraph("<code>refund</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Existing customer refund request queries.", tbl_cell_style), Paragraph("Ad Group B", tbl_cell_style)],
        [Paragraph("<code>complaint</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Customer complaint searches.", tbl_cell_style), Paragraph("Ad Group B", tbl_cell_style)],
        [Paragraph("<code>scam</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Reputation check / scam searches.", tbl_cell_style), Paragraph("Ad Group B", tbl_cell_style)],
        [Paragraph("<code>review</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Pure review seekers not in commercial booking mode.", tbl_cell_style), Paragraph("Ad Group B", tbl_cell_style)],
        [Paragraph("<code>alternative</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Competitor comparison seekers.", tbl_cell_style), Paragraph("Ad Group B", tbl_cell_style)],
        [Paragraph("<code>login</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Customer portal login attempts.", tbl_cell_style), Paragraph("Ad Group B", tbl_cell_style)],
        [Paragraph("<code>alaska</code>", tbl_cell_code), Paragraph("Broad Negative", tbl_cell_style), Paragraph("Wrong geography (commercial page serves Oregon rivers only).", tbl_cell_style), Paragraph("Ad Group B", tbl_cell_style)]
    ]

    t_neg_b = Table(neg_b_data, colWidths=[100, 85, 239, 80])
    t_neg_b.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_LIGHT])
    ]))
    story.append(t_neg_b)
    story.append(Spacer(1, 10))

    # STEP 5 & 7: SAFETY CHECK & REJECTED KEYWORDS
    story.append(Paragraph("Step 5 — Collision Check Result", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=ACCENT, spaceBefore=0, spaceAfter=8))
    
    col_text = """
    <b>Status: No collisions found.</b><br/>
    Every single target keyword across both Ad Group A (20 terms) and Ad Group B (15 terms) was cross-checked against all 35 negative terms. Zero negative keywords overlap with or block any recommended target terms.
    """
    story.append(Paragraph(col_text, body_style))
    story.append(Spacer(1, 8))

    story.append(Paragraph("Step 7 — Rejected Keywords & Rationale", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=ACCENT, spaceBefore=0, spaceAfter=8))

    rej_text = """
    1. <b><code>\"oregon fishing license online\"</code></b> (Phrase) — <i>Rejected because</i> Captain Ryan's site explicitly states guests must acquire licenses prior to the trip. The business does not sell licenses directly, so bidding on this term leaks budget to non-booking informational users.<br/>
    2. <b><code>\"cheap salmon fishing guide columbia river\"</code></b> (Exact/Phrase) — <i>Rejected because</i> Catching Chrome positions itself as a premium service ($150-$250/person) with USCG certified captains, top-tier gear, and custom sleds. Bidding on 'cheap' attracts low-intent price shoppers.<br/>
    3. <b><code>\"deep sea ocean salmon charters oregon\"</code></b> (Phrase) — <i>Rejected because</i> Catching Chrome operates exclusively on inland rivers (Columbia, Willamette, Deschutes) and coastal tributaries/bays, not offshore deep-sea ocean vessels.
    """
    story.append(Paragraph(rej_text, body_style))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF successfully built: {filename}")

if __name__ == "__main__":
    out_file = "Google_Ads_Keyword_Plan_Catching_Chrome.pdf"
    build_pdf(out_file)
