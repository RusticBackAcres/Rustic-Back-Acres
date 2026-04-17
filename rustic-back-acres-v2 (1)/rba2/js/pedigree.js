// ── 5-Generation Visual Pedigree Tree ────────────────────────────────────────
function buildPedigreeTree(a) {
  // Field naming convention:
  // Gen 1: sire, dam
  // Gen 2: ss (sire's sire), sd (sire's dam), ds (dam's sire), dd (dam's dam)
  // Gen 3: sss, ssd, sds, sdd, dss, dsd, dds, ddd
  // Gen 4: ssss, sssd, ssds, ssdd, sdss, sdsd, sdds, sddd, dsss, dssd, dsds, dsdd, ddss, ddsd, ddds, dddd
  // Gen 5: 16 animals prefixed one deeper

  const g = (key) => a[key] || '';

  const cell = (name, label) => `
    <div class="ped-cell">
      <div class="ped-cell-label">${label}</div>
      <div class="ped-cell-name">${name || '<span class="ped-unknown">—</span>'}</div>
    </div>`;

  return `
<div class="pedigree-tree-wrap">
  <div class="ped-tree">
    <!-- Col 1: Subject -->
    <div class="ped-col ped-col-subject">
      <div class="ped-subject">
        <div class="ped-cell-label">Subject</div>
        <div class="ped-cell-name subject-name">${a.call_name||''}</div>
        ${a.reg_name ? `<div class="ped-cell-reg">${a.reg_name}</div>` : ''}
      </div>
    </div>
    <!-- Col 2: Parents -->
    <div class="ped-col ped-col-2">
      ${cell(g('sire'), 'Sire')}
      ${cell(g('dam'), 'Dam')}
    </div>
    <!-- Col 3: Grandparents -->
    <div class="ped-col ped-col-3">
      ${cell(g('ss'), "Sire's Sire")}
      ${cell(g('sd'), "Sire's Dam")}
      ${cell(g('ds'), "Dam's Sire")}
      ${cell(g('dd'), "Dam's Dam")}
    </div>
    <!-- Col 4: Great-Grandparents -->
    <div class="ped-col ped-col-4">
      ${cell(g('sss'), 'SSS')}
      ${cell(g('ssd'), 'SSD')}
      ${cell(g('sds'), 'SDS')}
      ${cell(g('sdd'), 'SDD')}
      ${cell(g('dss'), 'DSS')}
      ${cell(g('dsd'), 'DSD')}
      ${cell(g('dds'), 'DDS')}
      ${cell(g('ddd'), 'DDD')}
    </div>
    <!-- Col 5: Great-Great-Grandparents -->
    <div class="ped-col ped-col-5">
      ${cell(g('ssss'), 'SSSS')}
      ${cell(g('sssd'), 'SSSD')}
      ${cell(g('ssds'), 'SSDS')}
      ${cell(g('ssdd'), 'SSDD')}
      ${cell(g('sdss'), 'SDSS')}
      ${cell(g('sdsd'), 'SDSD')}
      ${cell(g('sdds'), 'SDDS')}
      ${cell(g('sddd'), 'SDDD')}
      ${cell(g('dsss'), 'DSSS')}
      ${cell(g('dssd'), 'DSSD')}
      ${cell(g('dsds'), 'DSDS')}
      ${cell(g('dsdd'), 'DSDD')}
      ${cell(g('ddss'), 'DDSS')}
      ${cell(g('ddsd'), 'DDSD')}
      ${cell(g('ddds'), 'DDDS')}
      ${cell(g('dddd'), 'DDDD')}
    </div>
  </div>
</div>`;
}
