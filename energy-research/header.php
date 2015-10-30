<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
IncludeTemplateLangFile($_SERVER["DOCUMENT_ROOT"]."/bitrix/templates/".SITE_TEMPLATE_ID."/header.php");
$wizTemplateId = COption::GetOptionString("main", "wizard_template_id", "energy_research", SITE_ID);
CUtil::InitJSCore();
CJSCore::Init(array("fx"));
$curPage = $APPLICATION->GetCurPage(true);
?>

<!DOCTYPE html>
<html class="no-js">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=1000">

	<!--<link rel="shortcut icon" type="image/x-icon" href="<?=SITE_DIR?>/favicon.ico" />-->
    <link rel="icon" href="/favicon.png" type="image/png">
    <link rel="shortcut icon" href="/favicon.png" type="image/png">
	<?$APPLICATION->ShowHead(); ?>
	

	<?//echo //'<meta http-equiv="Content-Type" content="text/html; charset='.LANG_CHARSET.'"'.(true ? ' /':'').'>'."\n";
	$APPLICATION->ShowMeta("robots", false, true);
	$APPLICATION->ShowMeta("keywords", false, true);
	$APPLICATION->ShowMeta("description", false, true);
	$APPLICATION->ShowCSS(true, true);
	?>
	
	<?
	$APPLICATION->ShowHeadStrings();
	$APPLICATION->ShowHeadScripts();
	$APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH."/script.js");
	?>
	<title><? $APPLICATION->ShowTitle(); ?></title>
</head>

<body>
<?$APPLICATION->ShowPanel();?>





