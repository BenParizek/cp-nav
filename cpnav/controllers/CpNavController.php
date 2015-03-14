<?php
namespace Craft;

class CpNavController extends BaseController
{
    public function actionGetNavHtml()
    {
        $this->requirePostRequest();
        $this->requireAjaxRequest();

        $navId = craft()->request->getRequiredPost('id');
        $nav = craft()->cpNav->getNavById($navId);

        $variables = array(
            'nav' => $nav,
        );

        $returnData['html'] = $this->renderTemplate('cpnav/settings/_editor', $variables, true);

        $this->returnJson($returnData);
    }

    public function actionSaveNav()
    {
        $this->requirePostRequest();
        $this->requireAjaxRequest();

        $navId = craft()->request->getRequiredPost('id');
        $nav = craft()->cpNav->getNavById($navId);

        $nav->currLabel = craft()->request->getRequiredPost('currLabel');
        $nav->url = craft()->request->getRequiredPost('url');

        $nav = craft()->cpNav->saveNav($nav);

        $this->returnJson(array('success' => true, 'nav' => $nav));
    }

    public function actionReorderNav()
    {
        $this->requirePostRequest();
        $this->requireAjaxRequest();

        $navIds = JsonHelper::decode(craft()->request->getRequiredPost('ids'));
        craft()->cpNav->reorderNav($navIds);

        $this->returnJson(array('success' => true));
    }

    public function actionToggleNav()
    {
        $this->requirePostRequest();
        $this->requireAjaxRequest();

        $toggle = craft()->request->getRequiredPost('value');
        $navId = craft()->request->getRequiredPost('id');
        craft()->cpNav->toggleNav($navId, $toggle);

        $this->returnJson(array('success' => true));
    }

    public function actionRestore()
    {
        $this->requirePostRequest();

        craft()->cpNav->emptyTable();

        $this->redirectToPostedUrl();
    }

    public function actionNew()
    {
        $this->requirePostRequest();

        $settings = craft()->request->getRequiredPost('settings');
        $label = $settings['label'];
        $handle = $settings['handle'];
        $url = $settings['url'];

        $variables = array(
            'label' => $label,
            'handle' => strtolower($label),
            'url' => $url,
        );

        $nav = craft()->cpNav->createNav($variables);

        craft()->userSession->setNotice(Craft::t('Menu item added.'));

        $this->redirectToPostedUrl();
    }



}