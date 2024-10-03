import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { imageRequestor } from 'network';
// Remember to rename these classes and interfaces!

interface PluginSettings {
	url: string;
	api_key: string;
}

const DEFAULT_SETTINGS: PluginSettings = {
	url: 'default',
	api_key: ''
}

export default class MyPlugin extends Plugin {
	settings: PluginSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// This creates an icon in the left ribbon.
			// Called when the user clicks the icon.
		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		// we need to make a new command, that when run, will print the current file to the console
		// define a local tag counter function, which is given the filecontent, and returns the number of image tags
		function countImageTags(fileContent: string): number {
			return (fileContent.match(/\\img/g) || []).length;
		}
		async function replaceTags(fileContent:string,settings:PluginSettings){
			const imageTags = fileContent.match(/\\img/g) || [];
			const replacementValues:string[] = Array.from(await imageRequestor(countImageTags(fileContent),settings.url,settings.api_key));
			console.log(replacementValues);
			let replacedContent = fileContent;
			if(replacementValues != null){
				imageTags.forEach((tag, index) => {
					if (index < replacementValues.length) {
						replacedContent = replacedContent.replace(tag, replacementValues[index]);
					}
					});
			
				}

			return replacedContent;
		}
		this.addCommand({
			id: 'replace-image-tags',
			name: 'Replace Image Tags',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				if (navigator.onLine) {
					// There is internet connection
					// Make the request
					const fileContent = view.data;
					let replacedContent:string = '';
					// try catch 
					try{
						replacedContent = await replaceTags(fileContent,this.settings);
					}
					catch (error){
						new Notice('There was an error:'+error)

					}
					
					if(replacedContent != null){
						if(replacedContent != fileContent){
							await view.editor.setValue(replacedContent);
							console.log('No image tags to replace')
							// notify hthe number of changes
							new Notice('Replaced '+countImageTags(fileContent)+' image tags');
						}
						else{
							console.log('No image tags to replace')
							new Notice('No image tags to replace');
						}
						
					}
				} else {
					new Notice('No internet connection');
				}
		  }});
		
		//   add a button to the ribbon that will replace all image tags in the current file
		
		const ribbonIconEl = this.addRibbonIcon('refresh-ccw', 'Replace Image Tags',async (evt: MouseEvent) => {
			// Get the current active view
			const view = this.app.workspace.getActiveViewOfType(MarkdownView);
			if (!view) {
				new Notice('No markdown view is open');
				return;
			}
			
			// check if there's internet
			// if there is, then we can make the request

			if (navigator.onLine) {
				// There is internet connection
				// Make the request
				const fileContent = view.data;
				const replacedContent:string = await replaceTags(fileContent,this.settings);
				if(replacedContent != null){
					if(replacedContent != fileContent){
						await view.editor.setValue(replacedContent);
						console.log('No image tags to replace')
						// notify hthe number of changes
						new Notice('Replaced '+countImageTags(fileContent)+' image tags');
					}
					else{
						console.log('No image tags to replace')
						new Notice('No image tags to replace');
					}
					
				}
			} else {
				new Notice('No internet connection');
			}

			
		});

		ribbonIconEl.addClass('my-plugin-ribbon-class');
		
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}


class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Webhook Url')
			.setDesc('The url of where the image server is located')
			.addText(text => text
				.setPlaceholder('Ex: https://server.example.com')
				.setValue(this.plugin.settings.url)
				.onChange(async (value) => {
					this.plugin.settings.url = value;
					await this.plugin.saveSettings();
				}));
		const api = new Setting(containerEl)
		.setName('Webhook Key')
		.setDesc('The key to access the webhook you created when you set it up')
		.setClass('dotted-input')
		.addText(text => text
			.setPlaceholder('Ex: AKHJD4389184_JSDKJAKJ2')
			.setValue(this.plugin.settings.api_key)
			
			.onChange(async (value) => {
				this.plugin.settings.api_key = value;
				await this.plugin.saveSettings();
			}));
	
		;
	}
}
