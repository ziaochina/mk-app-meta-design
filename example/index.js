import { config, start, componentFactory } from 'mk-meta-engine'
import * as mkComponents from 'mk-component'
import myConfig  from './config'

import mk_app_meta_design_preview from './apps/mk-app-meta-design/apps/mk-app-meta-design-preview/index.js'
import mk_app_meta_design from './apps/mk-app-meta-design/index.js'

const apps = {
		
	[mk_app_meta_design_preview.name]: mk_app_meta_design_preview,	
	[mk_app_meta_design.name]: mk_app_meta_design,
}

apps.config = (options) => {
	Object.keys(options).forEach(key => {
		const reg = new RegExp(`^${key == '*' ? '.*' : key}$`)
		Object.keys(apps).forEach(appName => {
			if (appName != 'config') {
				if (reg.test(appName)) {
					apps[appName].config(options[key])
				}
			}
		})
	})
}

apps.config({ '*': { apps } })

config(myConfig({ apps }))

Object.keys(mkComponents).forEach(key=>{
	componentFactory.registerComponent(key, mkComponents[key])
})
	
start()