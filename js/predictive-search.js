const{Core,Utils,Cache}=Global,{$fetch,debounce,$toggleDisplay,$replaceContent,$active,$loading}=Utils,RQ_SECTION="r_predictive-search",RQ_SECTION_SELECTOR="[data-template]",ATTR_NO_RESULTS="data-empty-results",DEFAULT_MIN_CHARS=3,DEFAULT_LIMIT=5,DEBOUNCE_INTERVAL=300;customElements.define("predictive-search",class extends Core{propTypes={"results-limit":Number};elements={$:["search-input","product-type-select","button","results","initial"]};render(){this.$("search-input",{focus:this._handleFocus,input:debounce(this._handleInput.bind(this),DEBOUNCE_INTERVAL)}),this.$("button",{click:this._handleButtonClick}),this.$("product-type-select",{change:this._handleTypeSelect}),this._handleOuterClick()}_handleTypeSelect(){this._handleInput(),this.$("search-input").focus()}_handleButtonClick(e){this.$("search-input").value||(e.preventDefault(),this.$("search-input").focus())}_handleFocus(){this.active=this.minQueryChars||!!this.$("initial")}async _handleInput(){if(!this.minQueryChars){this.showInitial=!0,this.showResults=!1;return}await this._getQueryResults(),this._renderQueryResults(),this.active=!0}async _getQueryResults(){if(!Cache.has(this.query)){const $queryDoc=await this._fetchQueryDoc();Cache.set(this.query,{hasResults:!$queryDoc.hasAttribute(ATTR_NO_RESULTS),content:$queryDoc})}}async _fetchQueryDoc(){return $fetch(`${routes.predictive_search_url}`,{params:{q:this.query,"resources[limit]":this.limit,section_id:RQ_SECTION},before:this._loading(!0),after:this._loading(!1),select:RQ_SECTION_SELECTOR})}_renderQueryResults(){const currentQuery=Cache.get(this.query);$replaceContent(this.$("results"),currentQuery.content),this.showInitial=!currentQuery.hasResults,this.showResults=!0}_handleOuterClick(){document.addEventListener("click",e=>{!this.contains(e.target)&&this.active&&document.activeElement!==this.$("search-input")&&(this.active=!1)})}_loading(state){return()=>{$loading(this,state)}}set showInitial(state){if(!this.$("initial")){this.active=!1;return}$toggleDisplay(this.$("initial"),state),this.active=state}set showResults(state){$toggleDisplay(this.$("results"),state)}set active(state){state!==this._active&&($active(this,state),this._active=state)}get active(){return!!this._active}get minQueryChars(){return this.$("search-input").value.trim().length>=DEFAULT_MIN_CHARS}get query(){const inputValue=this.$("search-input").value.trim();return this.$("product-type-select")&&this.$("product-type-select").value!==""?`product_type:${this.$("product-type-select").value} AND ${inputValue}`:inputValue}get limit(){return this.prop("results-limit")||DEFAULT_LIMIT}});
//# sourceMappingURL=/cdn/shop/t/17/assets/predictive-search.js.map?v=104199195210997086131718817533
