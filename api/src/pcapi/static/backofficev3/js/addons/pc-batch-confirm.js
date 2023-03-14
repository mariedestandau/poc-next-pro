/**
 * Add support for button group actions that use the table multi select selections.
 *
 * To work, each `.btn-group` must set the following attributes:
 * - `[data-toggle="pc-batch-confirm-btn-group"]`: this value is fixed,
 * - `[data-toggle-id]`: this value must be a unique identifier,
 * - `[data-pc-table-multi-select-id]`: this value must be a valid pc table multi select identifier.
 *
 * Within the `.btn-group` container, you can add as many buttons as needed, and you must set some attributes too:
 * - `[data-url]`: this value must be a valid endpoint for the form submit,
 * - `[data-title]`: this value is used as a title by the modal opening form,
 * - `[data-batch-confirm-id]`: this value must be a unique identifier,
 * - `[data-modal-button-text]`: this value is used as the button text,
 * - `[data-user-confirmation-modal]`: `true` to open a modal to add a comment or `false` to submit directly.
 * - `[data-input-ids-name]`: this value is used as the input name for storing `selectedIds`
 *
 * @example
 * <div
 *   class="btn-group btn-group-sm"
 *   data-toggle="pc-batch-confirm-btn-group"
 *   data-toggle-id="table-container-user-offerer-validation-btn-group"
 *   data-pc-table-multi-select-id="table-container-user-offerer-validation"
 *   data-input-ids-name="object_ids"
 * >
 *   <button
 *     disabled
 *     type="button"
 *     class="btn btn-outline-primary"
 *     data-url="/backofficev3/pro/validation/user-offerer/batch-validate"
 *     data-title="Valider le(s) rattachement(s)"
 *     data-batch-confirm-id="validating-modal"
 *     data-modal-button-text="Valider"
 *     data-user-confirmation-modal="false"
 *   >
 *     Valider
 *   </button>
 *   <button
 *     disabled
 *     type="button"
 *     class="btn btn-outline-primary"
 *     data-url="/backofficev3/pro/validation/user-offerer/batch-pending"
 *     data-title="Mettre en attente le(s) rattachement(s)"
 *     data-batch-confirm-id="pending-modal"
 *     data-modal-button-text="Mettre en attente"
 *     data-use-confirmation-modal="true"
 *   >
 *     Mettre en attente
 *   </button>
 *   <button
 *     disabled
 *     type="button"
 *     class="btn btn-outline-primary"
 *     data-url="/backofficev3/pro/validation/user-offerer/batch-reject"
 *     data-title="Rejeter le(s) rattachement(s)"
 *     data-batch-confirm-id="rejecting-modal"
 *     data-modal-button-text="Rejeter"
 *     data-use-confirmation-modal="true"
 *   >
 *     Rejeter
 *   </button>
 * </div>
 */
class PcBatchConfirm extends PcAddOn {
  static BATCH_CONFIRM_BTN_GROUP_SELECTOR = '[data-toggle="pc-batch-confirm-btn-group"]'
  static BATCH_CONFIRM_BTN_SELECTOR = 'button[data-batch-confirm-id]'
  static BATCH_CONFIRM_MODAL_CLASS_PREFIX = 'current-batch-modal-'

  get $batchConfirmBtnGroups() {
    return document.querySelectorAll(PcBatchConfirm.BATCH_CONFIRM_BTN_GROUP_SELECTOR)
  }

  getBatchConfirmButtons($batchConfirmBtnGroup) {
    return $batchConfirmBtnGroup.querySelectorAll(PcBatchConfirm.BATCH_CONFIRM_BTN_SELECTOR)
  }

  initialize = () => {
    this.$batchConfirmBtnGroups.forEach(($batchConfirmBtnGroup) => {
      // create modal
      const { toggleId, pcTableMultiSelectId, inputIdsName } = $batchConfirmBtnGroup.dataset
      const modalIdentifier = `${PcBatchConfirm.BATCH_CONFIRM_MODAL_CLASS_PREFIX}${toggleId}`
      const hasModalInDom = $batchConfirmBtnGroup.parentElement.querySelector(modalIdentifier)

      if (!hasModalInDom) {
        const { $modal, $modalContent } = this.#appendNewModalInDom($batchConfirmBtnGroup.parentElement, modalIdentifier)
        this.state[toggleId] = {
          inputIdsName,
          $modalContent,
          modalIdentifier,
          modal: new bootstrap.Modal($modal, {})
        }
      }

      this.getBatchConfirmButtons($batchConfirmBtnGroup).forEach(($button) => {
        $button.dataset.pcTableMultiSelectId = pcTableMultiSelectId
        $button.dataset.toggleId = toggleId
      })
    })
  }

  bindEvents = () => {
    addEventListener('pcTableMultiSelect:change', this.#onBatchSelectionChange)
    this.$batchConfirmBtnGroups.forEach(($batchConfirmBtnGroup) => {
      EventHandler.on($batchConfirmBtnGroup, 'click', PcBatchConfirm.BATCH_CONFIRM_BTN_SELECTOR, this.#onBatchButtonClick)
    })
  }

  unbindEvents = () => {
    removeEventListener('pcTableMultiSelect:change', this.#onBatchSelectionChange)
    this.$batchConfirmBtnGroups.forEach(($batchConfirmBtnGroup) => {
      EventHandler.off($batchConfirmBtnGroup, 'click', PcBatchConfirm.BATCH_CONFIRM_BTN_SELECTOR, this.#onBatchButtonClick)
    })
  }

  #appendNewModalInDom = ($element, identifier) => {
    const $modal = document.createElement('div')
    $modal.classList.add('modal', 'fade', identifier)
    $modal.setAttribute('tabindex', '-1')
    $modal.setAttribute('aria-labelledby', identifier)
    $modal.setAttribute('aria-hidden', true)
    const $modalDialog = document.createElement('div')
    $modalDialog.classList.add('modal-dialog')
    const $modalContent = document.createElement('div')
    $modalContent.classList.add('modal-content')
    $modalDialog.append($modalContent)
    $modal.append($modalDialog)
    $element.append($modal)
    return { $modal, $modalDialog, $modalContent }
  }

  #onBatchSelectionChange = ({ detail }) => {
    const { selectedRowsIds, tableMultiSelectId } = detail
    this.$batchConfirmBtnGroups.forEach(($batchConfirmBtnGroup) => {
      const { pcTableMultiSelectId } = $batchConfirmBtnGroup.dataset
      if (tableMultiSelectId !== pcTableMultiSelectId) {
        return
      }

      this.getBatchConfirmButtons($batchConfirmBtnGroup).forEach(($button) => {
        $button.disabled = selectedRowsIds.size === 0
      })
    })
  }

  #onBatchButtonClick = (event) => {
    const { url, title, batchConfirmId, modalButtonText, useConfirmationModal, pcTableMultiSelectId, toggleId } = event.target.dataset
    const { csrfToken, addons } = this.app
    const { inputIdsName } = this.state[toggleId]

    this.state[toggleId].$modalContent.innerHTML = `
      <form action="${url}" method="POST" class="modal-content" data-turbo="false" name="${pcTableMultiSelectId}-form-${batchConfirmId}">
        ${csrfToken}
        <div class="modal-header">
          <h5 class="modal-title">${title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body row">
          <div class="form-floating my-3 col">
            <input name="${inputIdsName}" type="hidden" value="${Array.from(addons.pcTableMultiSelect.state[pcTableMultiSelectId].selectedRowsIds).join(',')}">
            <textarea
              name="comment"
              class="h-100 form-control pc-override-custom-textarea-enter"
              id="${pcTableMultiSelectId}-form-textarea-${batchConfirmId}"
              data-id="${batchConfirmId}"
              data-form-name="${pcTableMultiSelectId}-form-${batchConfirmId}"
              rows="3"
            ></textarea>
            <label for="${pcTableMultiSelectId}-form-textarea-${batchConfirmId}"><label for="comment">Raison</label></label>
            <div class="text-muted text-end"><small>Maj+Entrée pour ajouter une nouvelle ligne</small></div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">Annuler</button>
          <button type="submit" class="btn btn-primary">${modalButtonText}</button>
        </div>
      </form>`
    if (Boolean(useConfirmationModal)) {
      this.state[toggleId].modal.show()
      return
    }
    this.state[toggleId].$modalContent.querySelector('form').submit()
  }
}