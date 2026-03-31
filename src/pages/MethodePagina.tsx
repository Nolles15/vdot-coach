export default function MethodePagina() {
  const sections = [
    { id: 's1', nr: '01', title: 'Jack Daniels — achtergrond en context' },
    { id: 's2', nr: '02', title: 'Wat is VDOT precies?' },
    { id: 's3', nr: '03', title: 'De wiskundige formule' },
    { id: 's4', nr: '04', title: 'De vijf trainingszones' },
    { id: 's5', nr: '05', title: 'Het testprotocol — de 3 km tijdrit' },
    { id: 's6', nr: '06', title: 'Testafstanden vergeleken' },
    { id: 's7', nr: '07', title: 'VDOT referentietabel' },
    { id: 's8', nr: '08', title: 'Wetenschappelijke validatie' },
    { id: 's9', nr: '09', title: 'Beperkingen & nuances' },
    { id: 's10', nr: '10', title: 'Toepassing voor triathleten' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-16">

      {/* Page header */}
      <div className="border-b border-slate-700 pb-8">
        <p className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-3">Kennisbasis</p>
        <h1 className="text-4xl font-black text-white leading-tight mb-3">De VDOT-methode<br /><span className="text-slate-400 font-light">van Jack Daniels</span></h1>
        <p className="text-slate-400 text-base leading-relaxed max-w-xl">
          Wetenschappelijke achtergrond, formules, trainingszones, testprotocol en nuances van het VDOT-systeem zoals toegepast door Jack Daniels en Jimmy Gilbert (1979).
        </p>
      </div>

      {/* Table of contents */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
        <p className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-4">Inhoudsopgave</p>
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="flex items-baseline gap-2.5 text-sm text-slate-400 hover:text-blue-400 transition-colors py-0.5 group">
                <span className="font-mono text-xs text-slate-600 group-hover:text-blue-500">{s.nr}</span>
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Section 1 ── */}
      <section id="s1" className="space-y-4 scroll-mt-20">
        <SectionHeader nr="01" title="Jack Daniels — achtergrond en context" />
        <p className="text-slate-300 leading-relaxed">
          Jack Tupper Daniels (1933–2025) was een van de meest gerespecteerde hardloopcoaches en sportwetenschappers die de wereld heeft gekend. Runner's World riep hem uit tot <em className="text-slate-200">'The World's Best Running Coach'</em> — acht NCAA Division III nationale kampioenschappen, 31 individuele nationale titels en meer dan 130 All-America awards met de lopers van SUNY Cortland onderbouwen die aanspraak.
        </p>
        <p className="text-slate-300 leading-relaxed">
          Daniels begon als zwemmer, won een teamzilveren medaille bij de Olympische Spelen van 1956 (moderne vijfkamp) en behaalde later zijn doctoraat in de bewegingswetenschap. In de jaren zeventig begon hij samen met <strong className="text-slate-200">Jimmy Gilbert</strong> aan het project dat het VDOT-systeem zou worden: ze analyseerden honderden raceresultaten en ontdekten een opvallend stabiele relatie tussen prestaties op verschillende afstanden en trainingsintensiteiten.
        </p>
        <Callout>
          "Een atleet heeft meer aan een coachingmethode gebaseerd op zijn of haar werkelijke raceresultaten dan aan een laboratoriumtest die slechts één fysiologische parameter meet."
        </Callout>
        <p className="text-slate-300 leading-relaxed">
          Zijn boek <em className="text-slate-200">Daniels' Running Formula</em> (1998, nu 3e editie) is uitgegroeid tot een standaardwerk met het complete VDOT-systeem inclusief tabellen, trainingsplannen en fysiologische onderbouwingen.
        </p>
      </section>

      {/* ── Section 2 ── */}
      <section id="s2" className="space-y-4 scroll-mt-20">
        <SectionHeader nr="02" title="Wat is VDOT precies?" />
        <p className="text-slate-300 leading-relaxed">
          VDOT is een afkorting die Daniels zelf omschrijft als <em className="text-slate-200">pseudo-VO₂max</em> of <em className="text-slate-200">effectieve VO₂max</em>. De naam is letterlijk afgeleid van de fysiologische notatie V̇O₂max — de V met een puntje (dot) boven staat voor de tijdsafgeleide van volume, dus 'volume per tijdseenheid'.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { color: 'text-emerald-400 border-emerald-500/30', label: 'Component 1', title: 'Aerobe capaciteit', desc: 'De biologische maximale zuurstofopname (klassieke VO₂max) bepaalt je aerobe plafond.' },
            { color: 'text-blue-400 border-blue-500/30', label: 'Component 2', title: 'Loopeconomie', desc: 'De efficiëntie waarmee je beweegt. Twee lopers met gelijke VO₂max maar verschillende techniek presteren fundamenteel anders.' },
            { color: 'text-yellow-400 border-yellow-500/30', label: 'Bonus factor', title: 'Mentale taatheid', desc: 'De bereidheid om pijn te verdragen. Een laboratoriumtest mist dit volledig.' },
          ].map((c) => (
            <div key={c.title} className={`bg-slate-800 border rounded-xl p-4 ${c.color.split(' ')[1]}`}>
              <p className={`text-xs font-mono uppercase tracking-widest mb-1 ${c.color.split(' ')[0]}`}>{c.label}</p>
              <p className="font-semibold text-slate-100 mb-2">{c.title}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
        <InfoBox>
          <strong className="text-slate-200">Kernprincipe:</strong> VDOT meet wat je werkelijk kunt presteren, niet wat je theoretisch zou kunnen. Twee lopers met een identieke lab-VO₂max van 55 ml/kg/min kunnen een VDOT hebben van respectievelijk 48 en 52 als gevolg van verschillen in loopeconomie en racementale taatheid.
        </InfoBox>
        <p className="text-slate-300 leading-relaxed">
          VDOT-waarden bewegen zich typisch in het bereik van <strong className="text-slate-200">30</strong> (beginnende recreatieloper) tot <strong className="text-slate-200">85+</strong> (wereldklaselite). Recreatieve lopers: 35–45 · Serieuze amateurs: 45–55 · Gevorderd: 55+ · Elite marathonlopers: 70+.
        </p>
      </section>

      {/* ── Section 3 ── */}
      <section id="s3" className="space-y-4 scroll-mt-20">
        <SectionHeader nr="03" title="De wiskundige formule" />
        <p className="text-slate-300 leading-relaxed">
          De VDOT-formule (Daniels-Gilbert, 1979) bestaat uit twee componenten die gedeeld worden:
        </p>
        <div className="bg-slate-800 border border-slate-700 border-t-2 border-t-blue-500 rounded-b-xl p-5">
          <p className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-3">Daniels–Gilbert VDOT-vergelijking (1979)</p>
          <pre className="font-mono text-sm text-slate-300 leading-loose overflow-x-auto whitespace-pre-wrap">
{`VDOT = (–4.60 + 0.182258 × V + 0.000104 × V²)
       ─────────────────────────────────────────────────────────────
       0.8 + 0.1894393 × e^(–0.012778×T) + 0.2989558 × e^(–0.1932605×T)`}
          </pre>
          <div className="mt-4 pt-4 border-t border-slate-700 text-xs text-slate-400 leading-relaxed font-mono space-y-1">
            <p><span className="text-slate-300">V</span> = snelheid in meter per minuut (afstand / tijd)</p>
            <p><span className="text-slate-300">T</span> = tijd in minuten</p>
            <p><span className="text-slate-300">Teller</span> = zuurstofkosten van lopen op snelheid V</p>
            <p><span className="text-slate-300">Noemer</span> = welk % van VO₂max je gedurende T minuten kunt volhouden</p>
          </div>
        </div>
        <p className="text-slate-300 leading-relaxed">
          De elegantie zit in de noemer: bij een kortere inspanningsduur (kleine T) is de noemer kleiner, wat resulteert in een hogere VDOT voor dezelfde snelheid. Dit klopt fysiologisch: een loper kan bij een 3 km tijdrit op een hoger percentage van zijn VO₂max lopen dan bij een marathon.
        </p>
        <div className="bg-slate-800 border border-slate-700 border-t-2 border-t-slate-600 rounded-b-xl p-5">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">Rekenvoorbeeld: 3 km in 12:30</p>
          <pre className="font-mono text-xs text-slate-400 leading-loose whitespace-pre-wrap">
{`Afstand = 3000 m  |  Tijd = 12.5 min
V = 3000 / 12.5 = 240 m/min

Teller  = –4.60 + (0.182258 × 240) + (0.000104 × 240²) = 45.13
Noemer  = 0.8 + 0.1894 × e^(–0.160) + 0.2990 × e^(–2.416) = 0.988

VDOT = 45.13 / 0.988 ≈ `}<span className="text-emerald-400 font-semibold">45.7</span>
          </pre>
        </div>
      </section>

      {/* ── Section 4 ── */}
      <section id="s4" className="space-y-4 scroll-mt-20">
        <SectionHeader nr="04" title="De vijf trainingszones" />
        <p className="text-slate-300 leading-relaxed">
          Daniels onderscheidt vijf trainingszones, elk met een uniek fysiologisch doel en bijbehorende trainingspaces die direct voortvloeien uit de VDOT-waarde.
        </p>

        {/* Zone intensity bars */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-3">
          {[
            { zone: 'E', label: 'Easy', pct: 74, color: 'bg-emerald-500/30 text-emerald-400', barColor: 'bg-emerald-500/40', desc: '59–74% VO₂max · HRmax 65–79%' },
            { zone: 'M', label: 'Marathon', pct: 84, color: 'bg-blue-500/30 text-blue-400', barColor: 'bg-blue-500/40', desc: '75–84% VO₂max · HRmax 80–90%' },
            { zone: 'T', label: 'Threshold', pct: 88, color: 'bg-yellow-500/30 text-yellow-400', barColor: 'bg-yellow-500/40', desc: '83–88% VO₂max · HRmax 88–92%' },
            { zone: 'I', label: 'Interval', pct: 100, color: 'bg-orange-500/30 text-orange-400', barColor: 'bg-orange-500/40', desc: '97–100% VO₂max · HRmax 98–100%' },
            { zone: 'R', label: 'Repetition', pct: 100, color: 'bg-red-500/30 text-red-400', barColor: 'bg-red-500/40', desc: '106–119% VO₂max · volledig herstel vereist' },
          ].map((z) => (
            <div key={z.zone} className="flex items-center gap-3">
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 ${z.color}`}>{z.zone}</span>
              <div className="flex-1 min-w-0">
                <div className="h-6 rounded bg-slate-700 overflow-hidden">
                  <div className={`h-full ${z.barColor} flex items-center px-3 text-xs font-mono`} style={{ width: `${z.pct}%` }}>
                    {z.desc}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Zone detail table */}
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-700 text-slate-500 uppercase tracking-wide">
                <th className="px-4 py-3 text-left">Zone</th>
                <th className="px-4 py-3 text-left">% VO₂max</th>
                <th className="px-4 py-3 text-left">RPE</th>
                <th className="px-4 py-3 text-left">Fysiologisch doel</th>
                <th className="px-4 py-3 text-left">Typische sessie</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {[
                { zone: 'E', name: 'Easy', color: 'text-emerald-400 bg-emerald-500/10', vo2: '59–74%', rpe: '2–4', doel: 'Hartversterking, mitochondria-dichtheid, vetoxidatie, actief herstel.', sessie: 'Rustige duurlopen, warming-up / cooling-down. ≤80% weekvolume. Max ~2,5 uur.' },
                { zone: 'M', name: 'Marathon', color: 'text-blue-400 bg-blue-500/10', vo2: '75–84%', rpe: '5–6', doel: 'Racespesifieke uithoudingsvermogen voor de marathon. Vet-als-brandstof gebruik.', sessie: 'Gedeeltes van lange duurlopen in M-tempo. ≤15% weekvolume.' },
                { zone: 'T', name: 'Threshold', color: 'text-yellow-400 bg-yellow-500/10', vo2: '83–88%', rpe: '6–7', doel: 'Lactaatdrempel verhogen. T-tempo = ~60 min volhoudbaar. Comfortably hard.', sessie: 'Tempoloop 20–30 min aaneengesloten. Cruise intervals 4–5× 8–10 min. ≤10% weekvolume.' },
                { zone: 'I', name: 'Interval', color: 'text-orange-400 bg-orange-500/10', vo2: '97–100%', rpe: '8–9', doel: 'Maximale aerobe kracht (vVO₂max). Herhalingen idealiter 3–5 min.', sessie: '800m of 1000m herhalingen. Herstel = duur herhaling. ≤8% weekvolume.' },
                { zone: 'R', name: 'Repetition', color: 'text-red-400 bg-red-500/10', vo2: '106–119%', rpe: '9–10', doel: 'Neuromusculaire efficiëntie en loopsnelheid. Volledig herstel vereist.', sessie: '200m of 400m herhalingen. Herstel min. 2–3× duur, wandelend. ≤5% weekvolume.' },
              ].map((z, i) => (
                <tr key={z.zone} className={i % 2 === 0 ? 'bg-slate-800' : 'bg-slate-800/50'}>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-md text-xs font-black ${z.color}`}>{z.zone}</span>
                    <div className="text-slate-400 mt-0.5">{z.name}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-300">{z.vo2}</td>
                  <td className="px-4 py-3 font-mono text-slate-300">{z.rpe}/10</td>
                  <td className="px-4 py-3 text-slate-400 leading-relaxed">{z.doel}</td>
                  <td className="px-4 py-3 text-slate-400 leading-relaxed">{z.sessie}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <WarningBox>
          <strong className="text-slate-200">Het 'zwarte gat' vermijden:</strong> Veel lopers trainen bij een intensiteit die te hoog is voor E-doel (niet herstelvestigend) maar te laag voor T- of I-doel (geen drempelstimulus). Daniels noemt dit de grootste fout in het recreatief lopen. VDOT lost dit op door precieze grenzen te stellen aan elk tempo.
        </WarningBox>
      </section>

      {/* ── Section 5 ── */}
      <section id="s5" className="space-y-4 scroll-mt-20">
        <SectionHeader nr="05" title="Het testprotocol — de 3 km tijdrit" />
        <p className="text-slate-300 leading-relaxed">
          Daniels propageerde de <strong className="text-slate-200">3 km tijdrit</strong> als meest praktische testafstand. Lang genoeg om overwegend het aerobe systeem te belasten, maar kort genoeg om de test frequent te herhalen.
        </p>
        <InfoBox>
          <strong className="text-slate-200">Ideale testfrequentie:</strong> Herhaal de test elke <strong className="text-slate-200">6–10 weken</strong> om trainingsvoortgang bij te houden en je trainingszones actueel te houden.
        </InfoBox>

        <div className="space-y-3">
          {[
            { nr: 1, title: 'Testomstandigheden', desc: 'Atletiekbaan (400 m) bij voorkeur. Alternatief: vlak, geasfalteerd parcours. Ideaal: 10–18 °C, windstil. Noteer de omstandigheden voor vergelijkbaarheid bij hertest.' },
            { nr: 2, title: 'Voorbereiding (dag voor de test)', desc: 'Rust of licht actief herstel. Geen lange duurlopen of intensieve sessies. Goed eten en hydrateren. Slaap voldoende.' },
            { nr: 3, title: 'Warming-up (15–20 min)', desc: 'Minimaal 2 km rustig E-tempo, gevolgd door 4–6 × 100 m strides (versnellingen: easy → hard, wandelherstel). Eindig 2–3 min voor de test.' },
            { nr: 4, title: 'De tijdrit (3 km)', desc: 'Start conservatief. Doel: negatieve splits (tweede helft sneller). Aan het einde het gevoel hebben dat je écht niet harder had kunnen lopen. RPE 9–10/10.' },
            { nr: 5, title: 'Cooling-down (10 min)', desc: 'Minimaal 10 minuten rustig joggen op E-tempo. Noteer eindtijd, weersomstandigheden en subjectief gevoel (RPE).' },
            { nr: 6, title: 'VDOT berekenen', desc: 'Voer je eindtijd in via deze tool. Noteer je VDOT en trainingspaces als referentie voor de komende 6–10 weken.' },
          ].map((step) => (
            <div key={step.nr} className="flex gap-4 bg-slate-800 border border-slate-700 rounded-xl p-4">
              <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 text-xs font-bold text-blue-400">
                {step.nr}
              </div>
              <div>
                <p className="font-semibold text-slate-200 mb-1">{step.title}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 6 ── */}
      <section id="s6" className="space-y-4 scroll-mt-20">
        <SectionHeader nr="06" title="Testafstanden vergeleken" />
        <p className="text-slate-300 leading-relaxed">
          Hoe langer de afstand, hoe betrouwbaarder de VDOT-waarde — maar ook hoe groter de hersteleis.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { dist: '1 mijl', sub: '~1609 m', recommended: false, pros: ['Snel herstel', 'Frequente monitoring', 'Track-vriendelijk'], cons: ['Hogere anaërobe bijdrage (~25%)', 'Minder representatief'] },
            { dist: '3 km', sub: '3000 m · standaard', recommended: true, pros: ['Optimale aerobe/anaërobe balans', 'Herhaalbaar elke 6–8 weken', '7,5 ronden op baan'], cons: ['Iets minder nauwkeurig dan 5 km bij gevorderden'] },
            { dist: '5 km', sub: '5000 m · meest nauwkeurig', recommended: true, pros: ['Gouden standaard voor precisie', '~95–98% aerobe bijdrage', 'Populair via parkrun'], cons: ['Herstel 3–5 dagen', 'Vereist goede pacing-discipline'] },
            { dist: '10 km', sub: '10.000 m', recommended: false, pros: ['Zeer nauwkeurig', 'Wijdverbreide wedstrijdafstand'], cons: ['Herstel 5–7 dagen', 'Vereist specifieke opbouw'] },
            { dist: 'HM', sub: '21,1 km', recommended: false, pros: ['Representatief voor lange afstand'], cons: ['Coaches passen 2–3 VDOT-punten af', 'Grote hersteleis'] },
            { dist: '30 min', sub: 'tijdgebonden tijdrit', recommended: false, pros: ['Tijdgebonden', 'Populair bij triathleten'], cons: ['Voer afgelegde afstand in als custom'] },
          ].map((d) => (
            <div key={d.dist} className={`bg-slate-800 rounded-xl p-4 border ${d.recommended ? 'border-blue-500/40' : 'border-slate-700'}`}>
              <div className={`text-xl font-black mb-0.5 ${d.recommended ? 'text-blue-400' : 'text-slate-200'}`}>{d.dist}</div>
              <div className="text-xs text-slate-500 mb-3">{d.sub}</div>
              <ul className="space-y-1 text-xs text-emerald-400 mb-2">
                {d.pros.map((p) => <li key={p} className="flex gap-1.5"><span>+</span>{p}</li>)}
              </ul>
              <ul className="space-y-1 text-xs text-slate-500">
                {d.cons.map((c) => <li key={c} className="flex gap-1.5"><span>–</span>{c}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <InfoBox>
          Afstanden van <strong className="text-slate-200">3 km en langer</strong> leveren de meest betrouwbare VDOT-schattingen op. Onder de 3 km neemt de anaërobe bijdrage toe tot meer dan 20%.
        </InfoBox>
      </section>

      {/* ── Section 7 ── */}
      <section id="s7" className="space-y-4 scroll-mt-20">
        <SectionHeader nr="07" title="VDOT referentietabel" />
        <p className="text-slate-300 leading-relaxed">
          Selectie van representatieve VDOT-waarden met bijbehorende racetijden en trainingspaces.
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800/80">
                {['VDOT', '3 km', '5 km', '10 km', 'HM', 'Marathon', 'E-pace /km', 'T-pace /km', 'I-pace /km'].map((h) => (
                  <th key={h} className="px-3 py-3 text-left text-slate-500 uppercase tracking-wide font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {[
                [30, '17:05', '29:10', '1:01:01', '2:14:36', '4:49:17', '8:14–8:50', '7:21', '6:45'],
                [35, '14:19', '24:30', '51:27', '1:53:45', '4:03:17', '6:58–7:32', '6:11', '5:42'],
                [40, '12:19', '21:05', '44:22', '1:38:00', '3:29:07', '6:01–6:32', '5:22', '4:57'],
                [45, '10:51', '18:33', '39:10', '1:26:22', '3:03:41', '5:22–5:49', '4:47', '4:24'],
                [50, '9:41', '16:32', '34:58', '1:17:15', '2:43:29', '4:51–5:14', '4:18', '3:58'],
                [55, '8:44', '14:57', '31:37', '1:09:55', '2:28:00', '4:25–4:46', '3:55', '3:37'],
                [60, '7:57', '13:36', '28:48', '1:03:54', '2:15:00', '4:03–4:22', '3:35', '3:19'],
                [65, '7:18', '12:27', '26:26', '58:41', '2:04:00', '3:44–4:03', '3:18', '3:04'],
                [70, '6:45', '11:30', '24:19', '53:57', '1:53:51', '3:29–3:46', '3:04', '2:50'],
                [75, '6:17', '10:42', '22:37', '50:09', '1:46:01', '3:14–3:31', '2:52', '2:39'],
                [80, '5:54', '10:02', '21:05', '46:49', '1:39:12', '3:03–3:18', '2:42', '2:30'],
              ].map((row, i) => (
                <tr key={row[0] as number} className={i % 2 === 0 ? 'bg-slate-800' : 'bg-slate-800/50'}>
                  <td className="px-3 py-2.5 font-black text-white">{row[0]}</td>
                  {(row.slice(1) as string[]).map((val, j) => (
                    <td key={j} className={`px-3 py-2.5 ${j >= 5 ? 'text-blue-400' : 'text-slate-300'}`}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-600">Racetijden zijn equivalent performances — verwachte prestaties bij optimale voorbereiding en trainingsspecificiteit.</p>
      </section>

      {/* ── Section 8 ── */}
      <section id="s8" className="space-y-4 scroll-mt-20">
        <SectionHeader nr="08" title="Wetenschappelijke validatie" />
        <p className="text-slate-300 leading-relaxed">
          De VDOT-methode is in meerdere onafhankelijke studies geëvalueerd op de vraag: hoe goed voorspelt de VDOT-calculator de laboratorium-gemeten VO₂max en trainingsintensiteiten?
        </p>
        <InfoBox>
          <strong className="text-slate-200">Scudamore et al. (2018)</strong> — <em className="text-slate-300">Journal of Strength and Conditioning Research</em>: vergeleek VDOT-uitkomsten (via 5 km tijdrit) met laboratoriummetingen bij NCAA Division I atleten (n=11) en recreatieve lopers (n=9).
        </InfoBox>
        {[
          { label: 'Bevinding 1 — Threshold-paces', text: 'De VDOT-afgeleide drempelpace (T-pace) bleek bruikbaar voor beide groepen als trainingsrichtlijn, ongeacht het niveau. Sterke validatie voor de dagelijkse coachingspraktijk.' },
          { label: 'Bevinding 2 — Interval-paces', text: 'Bij recreatieve lopers was de I-pace conservatiever dan de werkelijk gemeten vVO₂max. Bij getrainde atleten was de overeenkomst goed. Recreatieve lopers trainen dus iets onder hun maximum — voor de meeste doeleinden gunstig.' },
          { label: 'Bevinding 3 — VDOT vs lab-VO₂max', text: 'VDOT onderschat de werkelijke VO₂max bij zowel atleten als recreatieve lopers. Dit is bewust: VDOT is geen zuivere VO₂max-schatting maar een gecombineerd trainingsprestatiegetal.' },
        ].map((b) => (
          <div key={b.label} className="bg-slate-800/50 border-l-2 border-blue-500 pl-4 py-2">
            <p className="text-sm font-semibold text-slate-200 mb-1">{b.label}</p>
            <p className="text-sm text-slate-400 leading-relaxed">{b.text}</p>
          </div>
        ))}
        <p className="text-slate-300 leading-relaxed">
          Conclusie van de auteurs: <em className="text-slate-200">"pTH kan met vertrouwen worden gebruikt voor drempeltraining ongeacht het niveau."</em> — Dat laatste is precies Daniels' eigen standpunt: VDOT is geen lab-meting, het is een trainingsgestuurd getal.
        </p>
      </section>

      {/* ── Section 9 ── */}
      <section id="s9" className="space-y-4 scroll-mt-20">
        <SectionHeader nr="09" title="Beperkingen & nuances" />
        <p className="text-slate-300 leading-relaxed">Elke methode heeft grenzen. Het kennen van de beperkingen maakt je tot een betere gebruiker.</p>
        {[
          { title: '1. Gebaseerd op goed getrainde lopers', text: 'De originele dataset bestond voornamelijk uit goed getrainde tot elite lopers. De precisie is groter voor lopers met VDOT 45+ dan voor beginners met VDOT 30–35. Beginners lopen ook structureel minder economisch, waardoor hun VDOT-berekening hun VO₂max onderschat.' },
          { title: '2. Marathondistantie onderschat trainingsfitheid', text: 'VDOT berekend uit een marathontijd onderschat de werkelijke aerobe capaciteit bij lopers zonder marathonspecifiek volume. Coaches adviseren voor marathontraining 2–3 VDOT-punten lager te werken. Bij halve marathon: 1–1.5 punt.' },
          { title: '3. Trainingshistorie is niet meegenomen', text: 'Een loper die een maand niet getraind heeft kan op basis van een recente prestatie te hoge trainingspaces krijgen. Gebruik alleen recente prestaties (max. 4–6 weken oud).' },
          { title: '4. Omgevingsfactoren beïnvloeden de test', text: 'Wind, hitte, hoogteverschil en ondervloer beïnvloeden de eindtijd significant. Een 3 km tijdrit bij 30 °C levert een lagere VDOT dan bij 12 °C. Consistente testomstandigheden zijn essentieel voor vergelijkbaarheid over tijd.' },
          { title: '5. VDOT is niet hetzelfde als VO₂max', text: 'VDOT is een prestatiegetal, geen fysiologische laboratoriumwaarde. Het reflecteert aerobe capaciteit én loopeconomie én mentale taatheid in één getal. Gebruik het als trainingsinstrument, niet als definitieve biologische maatstaf.' },
        ].map((item, i) => (
          <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <p className="font-semibold text-slate-200 mb-2">{item.title}</p>
            <p className="text-sm text-slate-400 leading-relaxed">{item.text}</p>
          </div>
        ))}
        <WarningBox>
          Als je VDOT via een 5 km op 52 staat maar je loopt je marathon significant langzamer, werk dan met je 5 km-VDOT als basis voor je trainingszones. Het marathonequivalent is een doel, geen trainingsrealiteit.
        </WarningBox>
      </section>

      {/* ── Section 10 ── */}
      <section id="s10" className="space-y-4 scroll-mt-20">
        <SectionHeader nr="10" title="Toepassing voor triathleten" />
        <p className="text-slate-300 leading-relaxed">
          De VDOT-methode is van origine ontworpen voor pure hardlopers. Bij triathleten gelden aanvullende overwegingen.
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-slate-200 mb-2">Lagere VDOT dan aerobe capaciteit suggereert</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Triathleten bouwen een groot deel van hun aerobe basis op via zwemmen en fietsen. Een triatleet met VO₂max 65 ml/kg/min kan een loop-VDOT van slechts 52 hebben — omdat de loopspecifieke economie lager is dan bij een pure loper met vergelijkbare aerobe capaciteit.
            </p>
          </div>
          <InfoBox>
            <strong className="text-slate-200">Praktische tip:</strong> Gebruik je VDOT op basis van een geïsoleerde hardlooptest (niet na een zwem- of fietssessie) als basis voor je looptrainingszones. Je Ironman run-prestatie ligt doorgaans 2–4 VDOT-punten onder je standalone loop-VDOT door vermoeidheid van de voorafgaande disciplines.
          </InfoBox>
          <div>
            <h3 className="font-semibold text-slate-200 mb-2">Ironman run-pacing</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Coaches schalen de Ironman-runpace terug naar het equivalent van <strong className="text-slate-300">3–5 VDOT-punten lager</strong> dan de standaloneloop-VDOT suggereert.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-200 mb-2">VDOT als progressiemeting</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              De <em>verbetering over tijd</em> is het meest waardevolle signaal. Dezelfde gestandaardiseerde 3 km-tijdrit elke 6–8 weken toont direct of je loopspecifieke fitheid verbetert — ook als zwem- en fietsvolume hoog zijn.
            </p>
          </div>
        </div>
        <Callout>
          "Train op je huidige VDOT, niet op je doel-VDOT. Jezelf ertoe dwingen op een hogere intensiteit te trainen dan je fysiologie aankan is de snelste route naar blessures en overtraining."
        </Callout>
      </section>

      {/* Sources */}
      <div className="border-t border-slate-700 pt-8">
        <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">Bronnen</p>
        <ol className="space-y-2 text-xs text-slate-500 list-decimal list-inside leading-relaxed">
          <li>Daniels, J. (2014). <em>Daniels' Running Formula</em> (3e editie). Human Kinetics.</li>
          <li>Daniels, J. & Gilbert, J. (1979). Oxygen power: Performance tables for distance runners. Tempe, Arizona.</li>
          <li>Scudamore, E.M., Barry, V.W., & Coons, J.M. (2018). An Evaluation of Time-Trial-Based Predictions of V̇O₂max. <em>Journal of Strength and Conditioning Research, 32</em>(4), 1137–1143.</li>
          <li>Wikipedia: Jack Daniels (coach).</li>
          <li>VDOT O2 official calculator. vdoto2.com. Run SMART Project, LLC.</li>
        </ol>
      </div>

    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ nr, title }: { nr: string; title: string }) {
  return (
    <div className="border-b border-slate-700 pb-3">
      <p className="text-xs font-mono text-slate-600 mb-1">{nr}</p>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-2 border-blue-500 pl-4 py-1 my-4">
      <p className="text-slate-300 italic leading-relaxed">{children}</p>
    </blockquote>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3 text-sm text-slate-300 leading-relaxed">
      {children}
    </div>
  );
}

function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3 text-sm text-slate-300 leading-relaxed">
      <span className="text-yellow-400 mr-2">⚠</span>{children}
    </div>
  );
}
